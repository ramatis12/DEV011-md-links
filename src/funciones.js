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
  if (!extensions.includes(fileExtension)) {
    const msj = "No es un arvhivo Markdown"
    return msj
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
        const msj = "No se puede leer el arvhivo"
          reject(msj); 
      } else {
        const filter = marked.parse(data);
          resolve(filter);
      }
    });
  });
}

// crear array
function linksArray(html, rutaArchivo) {
const $ = cheerio.load(html);
  const links = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
    const text = $(element).text();
    const file = rutaArchivo;
    links.push({href, text, file});
    //console.log(typeof(links));
  });
  return links;
}

function codigoHTTP(html, rutaArchivo) {
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
function statsFun(html) {
  const $ = cheerio.load(html);
  const links = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
  links.push(fetchPromise);
  });
  const enlacesUnicos = links.filter((enlace, index) => links.indexOf(enlace) === index).length;
  const total =  links.length;
 const resultadoStats = "Total: " + total + '\n' + "Unique: " + enlacesUnicos;
return resultadoStats;
}

function validarFun(html) {
   const $ = cheerio.load(html);
  const datos = [];
  $('a').each((index, element) => {
    const href = $(element).attr('href');
  const fetchPromise = fetch(href)
    .then(response => ({ ok: response.ok }))
    .catch(error => ({ ok: false }));
  datos.push(fetchPromise);
  });
return datos;
}



module.exports = {
  isAbsolutePath,
   convertAbsolute,
   validarRuta,
   validarExtension,
   readFile,
   linksArray,
   codigoHTTP,
   statsFun,
   validarFun
};
