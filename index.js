
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, readFile } = require("./src/funciones.js");


function mdLinks(route, validate) {
  const esAbsoluta = isAbsolutePath(route);
   if(esAbsoluta !== true){
     const convertirAbsoluta = convertAbsolute(route);
     const validarURL = validarRuta(convertirAbsoluta);
     const validarExtensionURL = validarExtension(validarURL);
     readFile(validarExtensionURL)
        .then((contenido) => {
          console.log(contenido);
        })
        .catch((error) => {
          console.error('Error al leer el archivo:', error);
        });

     //return leerArchivo
   }
  //return esAbsoluta

}
  
  module.exports = {
    mdLinks
  };
