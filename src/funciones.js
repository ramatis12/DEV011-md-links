const fs = require("fs");
const path = require("path");
const cheerio = require('cheerio');
const marked = require('marked');
const axios = require('axios');

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
function validateRoute(route) {
   if (fs.existsSync(route)) {
    return route
  } else {
    const msjError = "La ruta no existe"
    return msjError
  } 
}

//funcion validar archivo MD
function validateExtension(route) {
  const routeAbsolute = route;
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = routeAbsolute.toLowerCase();
  const fileExtension = formatted.split(".").pop();
  if (!extensions.includes(fileExtension)) {
    const msjError = "No es un arvhivo Markdown"
    return msjError
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
        const msjError = "No se puede leer el arvhivo"
          reject(msjError); 
      } else {
        const filter = marked.parse(data);
          resolve(filter);
      }
    });
  });
}

// crear array
function linksArray(html, routeArchivo) {
const $ = cheerio.load(html);
  const links = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
    const text = $(element).text();
    const file = routeArchivo;
    links.push({href, text, file});
    //console.log(typeof(links));
  });
  return links;
}

function codeHTTP(html, rutaArchivo) {
  const $ = cheerio.load(html);
  const links = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
    const text = $(element).text();
    const file = rutaArchivo;
    const fetchPromise = fetch(href)
      .then(response => ({ href, text, file, httpCode: response.status, ok: response.ok }))
      .catch(error => ({ href, text, file, httpCode: 'Error de conexión', ok: false }));
    links.push(fetchPromise);
  });
  return links;
}

function statsFun(objetArray, isValidateSelected) {
   const numberLinks = objetArray.filter(item => item.href).length;
   const uniqueHrefs = [...new Set(objetArray.map(item => item.href))];
   const numberUnique = uniqueHrefs.length;
   if (isValidateSelected) {
    const numberBroken = objetArray.filter(item => !item.ok).length;
    const totales = "Total: " + numberLinks + "\n" + "Unique: " + numberUnique + "\n" + "Broken: " + numberBroken;
  return totales;  
   }else{
  const totales = "Total: " + numberLinks + "\n" + "Unique: " + numberUnique;
  return totales; 
   }
  }


module.exports = {
  isAbsolutePath,
   convertAbsolute,
   validateRoute,
   validateExtension,
   readFile,
   linksArray,
   codeHTTP,
   statsFun
};
