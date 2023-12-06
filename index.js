
const { isAbsolutePath, convertAbsolute, validateRoute, validateExtension, readFile, linksArray, codeHTTP, statsFun } = require("./src/funciones.js");


function mdLinks(route, validate, stats) {
  return new Promise((resolve, reject) => {
    const validateRouteAbsolute = isAbsolutePath(route);
    if (validateRouteAbsolute !== true) {
      const convertRouteAbsolute = convertAbsolute(route);
      const validateURL = validateRoute(convertRouteAbsolute);
      const validateExtensionURL = validateExtension(validateURL);
      readFile(validateExtensionURL)
        .then((content) => {
          if (validate === true && stats === false) {
            Promise.all(codeHTTP(content, validateExtensionURL))
            .then((links) => {
              resolve(links);
            })
          }
         else if (stats && (validate === true || !validate)) {
          Promise.all(codeHTTP(content))
          .then((links) => {
            const resultadosStats = statsFun(links, validate)
            resolve(resultadosStats);
          })
           }
          else {
            const documentArray = linksArray(content, validateExtensionURL);
            resolve(documentArray);
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
