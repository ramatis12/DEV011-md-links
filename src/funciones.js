const fs = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");
const marked = require('marked');

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
          const filter = markdownLinkExtractor(data);
          //console.log(links);
          resolve(filter);
        }
      });
    });
  }
}

function linksArray(filePath, linkHref) {
  return new Promise((resolve, reject) => {
    readFile(filePath)
      .then((content) => {
        // Hacer cualquier manipulación necesaria en los datos
        const links = content.links;
        const linkInfo = links.find((link) => link.href === linkHref);
        // const linksAsObjects = links.map(link => ({
        //    href: link ,
        //    text: linkInfo,
        //    filePath: filePath,
        //   }));
        // Por ahora, simplemente resolvemos la promesa con los links
        resolve(linkInfo);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
//  function linksArray(filePath) {
//    const archivo = readFile(filePath);
//        let link = [];
//      link = archivo.links;
//   console.log('esto es archivo', archivo);
//   const urls = links.filter((link) => esURL(link));
//   const linksAsObjects = linksArray.map(link => ({ href: link }));
//   console.log(linksArray);
//   Resuelve la promesa con el array de objetos de enlaces
//   return archivo;
//  }

module.exports = {
  isAbsolutePath,
  convertAbsolute,
  validarExtension,
  readFile,
  linksArray
};
