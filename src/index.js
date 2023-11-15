const mdLinks = require('./mdlinks.js');

const mdlFilePath = './README.md';

mdLinks(mdlFilePath)
  .then((content) => {
    console.log(`Archivo MD`);
  })
  .catch((error) => {
    console.error(`Error al leer el archivo`);
  });