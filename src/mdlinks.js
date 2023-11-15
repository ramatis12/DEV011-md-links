const fs = require('fs');
const path = require('path');


function mdLinks(filePath) {
  // Obtén la extensión del archivo
  const fileExtension = path.extname(filePath);

  // Valida la extensión
  const extensions = ['md', 'markdown', 'mkd', 'mdown', 'mdtxt', 'mdtext'];
  const formatted = fileExtension.toLowerCase().slice(1);

  if (!extensions.includes(formatted)) {
    console.log(`Extension de archivo incorrecta`);
  }
else{
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
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