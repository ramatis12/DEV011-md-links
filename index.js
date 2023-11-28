const { linksArray } = require('./funciones.js');

const mdlFilePath = './README.md';
const mdlFilePath1 = './README.js';
const test = './test/array.md';

linksArray(mdlFilePath)
  .then((links) => {
    console.log(links);
  })
  .catch((error) => {
    console.error('Error:', error);
  });