const yargs = require('yargs');
const{ mdLinks } = require("..")

const mdlFilePath = './README.md';
const mdlFilePath1 = './README.png';
const mdlFilePath2 = './thumb.png';
const test = './test/array.md';
const isValidateSelected = process.argv.find(element => element === "--validate") ? true : false; 
const idStatsSelected = process.argv.find(element => element === "--stats") ? true : false;
//console.log(mdLinks( mdlFilePath ));

mdLinks(test, isValidateSelected, idStatsSelected).then ((res) => console.log(res))
.catch((error) => console.log(error))

