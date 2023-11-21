const fs = require("fs");
const path = require("path");
//funcion si es absoluta
//Funcion para convertirla en absoluta
//funcion validar archivo MD
// funcion leer archivo 

const isAbsolutePath = (route) => path.isAbsolute(route);

const convertAbsolute = (route) => {
  const validatePath = isAbsolutePath(route);
  const returnPathAbsolute = validatePath ? route : path.resolve(route);
  return returnPathAbsolute;
};

function validarExtension(route) {
  const rutaAbsolute = convertAbsolute(route)
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
    // Obtener la extensión del archivo
  const fileExtension = formatted.split('.').pop();
  return extensions.includes(fileExtension);
}

const markdownLinkExtractor = require('markdown-link-extractor');

function mdLinks(filePath) {
  // Obtén la extensión del archivo
  const fileExtension = path.extname(filePath);
 
  if (!validarExtension(fileExtension)) {
    console.log(`No es un arvhivo Markdown`);
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const links = markdownLinkExtractor(data);

          // Puedes imprimir o hacer algo con los enlaces aquí
          console.log('Enlaces encontrados:', links);

          //resolve(data);
        }
      });
    });
  }
}
module.exports = {isAbsolutePath, convertAbsolute, validarExtension, mdLinks};
