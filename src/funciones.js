const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const marked = require('marked');

//funcion si es absoluta
function isAbsolutePath(route) { return path.isAbsolute(route) };

//Funcion para convertirla en absoluta
function convertAbsolute(route) {
  const validatePath = isAbsolutePath(route);
  const returnPathAbsolute = validatePath ? route : path.resolve(route);
  return returnPathAbsolute;
};

//validar que la ruta existe en el equipo
function validarRuta(route) {
  try {
    fs.accessSync(route, fs.constants.F_OK);
    return route;
  } catch (error) {
    console.log(`La ruta '${route}' no existe.`);
    return route;
  }
}
//funcion validar archivo MD
function validarExtension(route) {
  const rutaAbsolute = route;
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
  const fileExtension = formatted.split(".").pop();
  if (!extensions.includes(fileExtension)) {
    console.log(`No es un arvhivo Markdown`);
    return [];
  } else {
    return route;
  }
  
}

// funcion leer archivo
function readFile(route) {
  return new Promise((resolve, reject) => {
    //console.log(route);
    fs.readFile(route, 'utf8', (err, data) => {
      if (err) {
        reject(err); 
      } else {
        const filter = marked.parse(data);
          resolve(filter);
      }
    });
  });
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
