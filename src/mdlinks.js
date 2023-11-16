const fs = require("fs");
const path = require("path");
//funcion si es absoluta
//Funcion para convertirla en absoluta
//funcion validar archivo MD
// funcion leer archivo 

const isAbsolutePath = (route) => path.isAbsolute(route);

const convertAbsolute = (route) => {
  const validatePath = isAbsolutePath(route);
  const returnPathAbsolute = validatePath ? route : path.resolve(route);
  return returnPathAbsolute;
};

function validarExtension(route) {
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = route.toLowerCase();
    // Obtener la extensión del archivo
  const fileExtension = formatted.split('.').pop();
  return extensions.includes(fileExtension);
}


console.log(validarExtension("docs/01-milestone.md"));

function mdLinks(filePath) {
  // Obtén la extensión del archivo
  const fileExtension = path.extname(filePath);
  

  // Valida la extensión
  const extensions = ["md", "markdown", "mkd", "mdown", "mdtxt", "mdtext"];
  const formatted = fileExtension.toLowerCase().slice(1);

  if (!extensions.includes(formatted)) {
    console.log(`Extension de archivo incorrecta`);
  } else {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}
module.exports = mdLinks;
