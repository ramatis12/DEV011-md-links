const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const marked = require('marked');
const axios = require('axios');

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
          const filter = marked.parse(data);
          //console.log(filter);
          resolve(filter);
        }
      });
    });
  }
}

function linksArray(filePath) {
  return new Promise((resolve, reject) => {
   readFile(filePath)
      .then((content) => {
        const $ = cheerio.load(content);
        const links = [];

           $('a').each((index, element) => {
          const href = $(element).attr('href');
          const text = $(element).text();
          const file = convertAbsolute(filePath);
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
  validarExtension,
  readFile,
  linksArray
};
