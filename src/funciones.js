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
  const validatePath = convertAbsolute(route);
  if (!fs.existsSync(validatePath)) {
    console.log(`La ruta '${validatePath}' no existe.`);
    return validatePath;
  }
} 

//funcion validar archivo MD
function validarExtension(route) {
  const rutaAbsolute = validarRuta(route);
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = rutaAbsolute.toLowerCase();
  const fileExtension = formatted.split(".").pop();
  console.log(fileExtension);
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
          const filter = marked.parse(data);
          //console.log(filter);
          resolve(filter);
        }
      });
    });
  }
}

function linksArray(route) {
  console.log("el nombre correcto es", route);
  return new Promise((resolve, reject) => {
   readFile(route)
      .then((content) => {
        const $ = cheerio.load(content);
        const links = [];

           $('a').each((index, element) => {
          const href = $(element).attr('href');
          const text = $(element).text();
          const file = convertAbsolute(route);
          const status = "";
          const ok = "";
          links.push({ href, text, file, status, ok });
      });
        console.log(links);
        resolve(links);
      })
      .catch((error) => {
        reject(error);
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
