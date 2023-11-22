const { linksArray } = require('./funciones.js');

const mdlFilePath = './README.md';

linksArray(mdlFilePath)
  .then((res) => {
    console.log(res);
  })
  .catch((error) => {
    console.error(`Error al leer el archivo`);
  });