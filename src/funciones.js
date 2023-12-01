const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const marked = require('marked');

//funcion si es absoluta
function isAbsolutePath(route) {
  return path.isAbsolute(route) 
};

//Funcion para convertirla en absoluta
function convertAbsolute(route) {
  const pathAbsolute =  path.resolve(route);
  return pathAbsolute;
};

//validar que la ruta existe en el equipo
function validarRuta(route) {
   if (fs.existsSync(route)) {
    return route
  } else {
    const msj = "La ruta no existe"
    return msj
  } 
}

//funcion validar archivo MD
function validarExtension(route) {
  const rutaAbsolute = route;
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
  const fileExtension = formatted.split(".").pop();
  //console.log(formatted);
  if (!extensions.includes(fileExtension)) {
   return console.log(`No es un arvhivo Markdown`);
  } else {
    return formatted;
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

module.exports = {
  isAbsolutePath,
   convertAbsolute,
   validarRuta,
   validarExtension,
   readFile,
  // linksArray,
  // arrayComplete
};
