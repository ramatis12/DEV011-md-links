const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require('markdown-link-extractor');

//funcion si es absoluta
const isAbsolutePath = (route) => path.isAbsolute(route);
//Funcion para convertirla en absoluta
const convertAbsolute = (route) => {
  const validatePath = isAbsolutePath(route);
  const returnPathAbsolute = validatePath ? route : path.resolve(route);
  return returnPathAbsolute;
};
//funcion validar archivo MD
function validarExtension(route) {
  const rutaAbsolute = convertAbsolute(route)
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
 
  const fileExtension = formatted.split('.').pop();
  return extensions.includes(fileExtension);
}
// funcion leer archivo 
// function readFile(filePath){
//   const fileExtension = path.extname(filePath);
//   if (!validarExtension(fileExtension)) {
//     console.log(`No es un arvhivo Markdown`);
//     return Promise.resolve([]);
//   } else {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error al leer el archivo:', err);
//       return;
//     }
//     const links = markdownLinkExtractor(data);
//     return links;
//     //console.log('Enlaces extraídos:\n', links);
//   });
  
//   }
// }
// guardar en un array

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
        } 
        else {
          const links = markdownLinkExtractor(data) || [];
          const linksArray = Object.values(links);
          linksArray.forEach(link => console.log(link));
          //const urls = links.filter((link) => esURL(link));
          //
          //const linksAsObjects = linksArray.map(link => ({ href: link }));
          console.log(links);
  // Resuelve la promesa con el array de objetos de enlaces
  //resolve(linksAsObjects);

          //resolve(data);
        }
      });
    });
  }
}



module.exports = {isAbsolutePath, convertAbsolute, validarExtension, mdLinks};
