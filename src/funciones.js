const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const marked = require('marked');
const axios = require('axios');

//funcion si es absoluta
function isAbsolutePath(route){ return path.isAbsolute(route)};

//Funcion para convertirla en absoluta
function convertAbsolute(route) {
  const validatePath = isAbsolutePath(route);
  const returnPathAbsolute = validatePath ? route : path.resolve(route);
 return returnPathAbsolute;
};
//validar que la ruta existe en el equipo
function validarRuta(route) {
  console.log(route);
  const validatePath = convertAbsolute(route);
  console.log(validatePath);
  if (!fs.existsSync(validatePath)) {
    console.log(`La ruta '${validatePath}' no existe.`);
    return validatePath;
  } 
}
//funcion validar archivo MD
function validarExtension(route) {
  console.log("texto", route);
  const rutaAbsolute = validarRuta(route);
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
  const fileExtension = formatted.split(".").pop();
  //console.log('extencion', fileExtension);
  return extensions.includes(fileExtension);
}

// funcion leer archivo
function readFile(route) {
  const fileExtension = path.extname(route);
  if (!validarExtension(fileExtension)) {
    console.log(`No es un arvhivo Markdown`);
    return Promise.resolve([]);
  } else {
    console.log("hola", route);
    return new Promise((resolve, reject) => {
      fs.readFile(route, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          const filter = marked.parse(data);
          //console.log(filter);
          resolve(filter);
        }
      });
    });
  }
}

// crear array
function linksArray(route) {
  //console.log("el nombre correcto es", route);
  return new Promise((resolve, reject) => {
   readFile(route)
      .then((content) => {
        const $ = cheerio.load(content);
        const links = [];
         const linkPromises = $('a').map((index, element) => {
          const href = $(element).attr('href');
          const text = $(element).text();
          const file = convertAbsolute(route);

          return fetch(href)
            .then(response => ({
              href,
              text,
              file,
              status: response.status,
              ok: response.ok,
            }))
            .catch(error => ({
              href,
              text,
              file,
              status: 'Error de conexión',
              ok: false,
            }));
        }).get(); 
        
        Promise.all(linkPromises)
          .then((resolvedLinks) => {
            //console.log(resolvedLinks);
            resolve(resolvedLinks);
      });
      })
      .catch((error) => {
       const status = error.response ? error.response.status : 'Error de red';
              const ok = false;
              reject(new Error({ href, text, file, status, ok }));
      });
  });
}  



module.exports = {
  isAbsolutePath,
  convertAbsolute,
  validarRuta,
  validarExtension,
  readFile,
  linksArray
};
