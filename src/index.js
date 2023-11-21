const { mdLinks } = require('../src/mdlinks.js');

const mdlFilePath = './README.md';

mdLinks(mdlFilePath)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error(`Error al leer el archivo`);
  });