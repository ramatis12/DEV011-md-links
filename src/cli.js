
const{ mdLinks } = require("..")

const mdlFilePath = './README.md';
const mdlFilePath1 = './README.js';
const test = './test/array.md';
const isValidateSelected = process.argv.find(element => element === "--validate") ? true : false; 
//console.log(mdLinks( mdlFilePath ));

mdLinks(mdlFilePath, isValidateSelected).then ((res) => console.log(res))
.catch((error) => console.log(error))
//console.log(isValidateSelected);