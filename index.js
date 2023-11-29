
const {  convertAbsolute, validarRuta, validarExtension, readFile, linksArray, arrayComplete } = require("./src/funciones.js");


function mdLinks(route, validate) {
  return new Promise((resolve, reject) => {
  const absoluta = convertAbsolute(route);
  const linksFin = validarRuta(absoluta);
  const extensions = validarExtension(linksFin);
  //console.log("archivo", extensions);
  readFile(absoluta)
  if (validate === true) {
    arrayComplete(extensions)
    .then((res) => {
      resolve (res);
    })
    .catch((error) => {
        reject(error); 
    });
  }else{
  linksArray(extensions)
  .then((res) => {
    resolve (res);
  })
  .catch((error) => {
      reject(error); 
  });
}
  })
}
  
  module.exports = {
    mdLinks
  };
