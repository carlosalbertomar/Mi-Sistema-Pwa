
if('serviceWorker' in navigator){
    console.log('se puede usar el SW');
    navigator.serviceWorker.register('./sw.js')
    .then(res=>console.log(`se ha registrdo el SW:${res}`))
    .catch(e=>console.log(`ha fallado la instalacion del SW:${e}`));
}else{
    console.log("no soportado");
}