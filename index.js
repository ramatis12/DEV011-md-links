
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, readFile, linksArray, codigoHTTP, validarFun, statsFun } = require("./src/funciones.js");


function mdLinks(route, validate, stats) {
  return new Promise((resolve, reject) => {
    const esAbsoluta = isAbsolutePath(route);
    if (esAbsoluta !== true) {
      const convertirAbsoluta = convertAbsolute(route);
      const validarURL = validarRuta(convertirAbsoluta);
      const validarExtensionURL = validarExtension(validarURL);
      readFile(validarExtensionURL)
        .then((contenido) => {
          if (validate === true && stats === false) {
            Promise.all(codigoHTTP(contenido, validarExtensionURL))
            .then((links) => {
              resolve(links);
            })
          }
         else if (stats && (validate === true || !validate)) {
          Promise.all(codigoHTTP(contenido))
          .then((links) => {
            const resultadosStats = statsFun(links, validate)
            resolve(resultadosStats);
          })
           }
          else {
            const documentoArray = linksArray(contenido, validarExtensionURL);
            resolve(documentoArray);
          }
        })
        .catch((error) => {
          console.error('Error al leer el archivo ');
        });
    }
  })
}
module.exports = {
  mdLinks
};
