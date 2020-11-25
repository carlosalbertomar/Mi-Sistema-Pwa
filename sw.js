const CACHE_NAME='pw_cache';
var urlsToCache=[
    './',
    './Estilos.css/MaquetacionEstilos.css',
    './Estilos.css/Responsive.css',
    './img/icono_l.jpg',
    './img/icono_m.jpg',
    './img/icono_s.jpg',
    './img/icono.jpg'
];

self.addEventListener('install',e=>{
    e.waitUntil(
      caches.open(CACHE_NAME)
      .then(cache=>{
        return cache.addAll(UrlsToCache)
        .then(()=>{
          self.skipWaiting();
        });
      }).catch(err=>
        console.log('no se ha registrado el cache',err)));
  });

  self.addEventListener('activate',e=>{
    const cacheWhiteList=[CACHE_NAME];
    e.waitUntil(
      caches.keys()
        .then(cacheNames =>{
          return Promise.all(cacheNames.map(cacheName=>{
            if(cacheWhiteList.indexOf(cacheName)===- 1){
                
                return caches.delete(cacheName);
            }
          })
         );
       })
       .then(()=>{
        
          self.clients.claim();
       })
    );
  });

  self.addEventListener('fetch',e=>{
      e.respondWith(
        caches.match(e.request)
          .then(res=>{
            if(res){
            
              return res;
            }
            return fetch(e.request);
          })
      );
  });
  