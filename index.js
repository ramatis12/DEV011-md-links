
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, readFile, linksArray } = require("./src/funciones.js");


function mdLinks(route) {
  return new Promise((resolve, reject) => {
  const absoluta = convertAbsolute(route);
  const linksFin = validarRuta(absoluta);
  const extensions = validarExtension(linksFin);
  readFile(extensions)
  linksArray(extensions)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  })

  }
  module.exports = {
    mdLinks
  };
