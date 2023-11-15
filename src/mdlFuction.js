const fs = require('fs');
const path = require('path');


function readMDLFile(filePath) {
  // Obtén la extensión del archivo
  const fileExtension = path.extname(filePath);

  // Valida la extensión
  if (fileExtension.toLowerCase() !== '.md' && fileExtension.toLowerCase() !== '.mdl') {
    return Promise.reject(new Error('Extensión del archivo es incorrecta.'));
  }

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

//export { readMDLFile };
module.exports = readMDLFile;