const readMDLFile = require('./mdlFuction.js');

const mdlFilePath = './README.md';
console.log(mdlFilePath);

readMDLFile(mdlFilePath)
  .then((content) => {
    console.log(`Contenido del archivo MDL:\n${content}`);
  })
  .catch((error) => {
    console.error(`Error al leer el archivo MDL: ${error.message}`);
  });