const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");
const marked = require('marked');
const { validateHeaderValue } = require("http");

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
  const rutaAbsolute = convertAbsolute(route);
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();

  const fileExtension = formatted.split(".").pop();
  return extensions.includes(fileExtension);
}
// funcion leer archivo
function readFile(route) {
  const fileExtension = path.extname(route);
  if (!validarExtension(fileExtension)) {
    console.log(`No es un arvhivo Markdown`);
    return Promise.resolve([]);
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(route, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const links = markdownLinkExtractor(data);
          //console.log(links);
          resolve(links);
        }
      });
    });
  }
}


 function linksArray(filePath) {
   const archivo = readFile(filePath);


   //si puedo poner aqui la funcion markdownLinkExtractor y convertirla 
   //en string con los Value para posteriormente hacer el array que necesito.

//   const links = [];
  //const tokens = marked.lexer(archivo);
  //const links = markdownLinkExtractor(archivo);
  //const htmlString = marked(links);
  console.log('esto es archivo', archivo);
//     if (links.length === 0) {
//       console.log(`No se encontraron links`);
//     return [];
//     } else {
//       console.log(`links`);
//       // const linksArray = Object.values(links);
//       // linksArray.forEach((link) => console.log(link));
//      return;
//     }

//   const urls = links.filter((link) => esURL(link));
//   const linksAsObjects = linksArray.map(link => ({ href: link }));
//   console.log(linksArray);
//   Resuelve la promesa con el array de objetos de enlaces
  return archivo;
 }

module.exports = {
  isAbsolutePath,
  convertAbsolute,
  validarExtension,
  readFile,
  linksArray
};
