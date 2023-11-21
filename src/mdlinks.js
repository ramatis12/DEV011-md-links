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
  const fileExtension = path.extname(filePath);
 
  if (!validarExtension(fileExtension)) {
    console.log(`No es un arvhivo Markdown`);
    return Promise.resolve([]);
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const links = markdownLinkExtractor(data);
          const linksArray = Array.from(links);
          // Puedes imprimir o hacer algo con los enlaces aquí
  //         console.log('Enlaces encontrados:', linksArray);
  //  // Verifica si links es un array antes de mapearlo
  //  if (!Array.isArray(linksArray)) {
  //   console.log('no hay link');
  //   resolve([]);
  //   return;
  // }
  const linksAsObjects = links.map(link => ({ href: link }));
console.log(linksArray);
  // Resuelve la promesa con el array de objetos de enlaces
  resolve(linksAsObjects);

          //resolve(data);
        }
      });
    });
  }
}
module.exports = {isAbsolutePath, convertAbsolute, validarExtension, mdLinks};
