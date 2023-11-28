const { linksArray } = require('./funciones.js');

const mdlFilePath = './README.md';

function mdLinks(mdlFilePath) {
    linksArray(mdlFilePath)
    .then((links) => {
      console.log(links);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  module.exports = {
mdLinks
  };