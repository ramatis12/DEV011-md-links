const { linksArray } = require('./funciones.js');

const mdlFilePath = './README.md';

linksArray(mdlFilePath)
  .then((links) => {
    console.log('Links:', links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });