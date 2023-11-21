const fs = require("fs");
const path = require("path");
const { isAbsolutePath, convertAbsolute, validarExtension, mdLinks } = require('../src/mdlinks.js');



describe('mdLinks', () => {

  it('Es una funcion', () => {
    expect(typeof mdLinks).toBe('function');
  }); 
  it('Debera devolver verdadero para rutas absolutas', () => {
    const absolutePath = 'C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md';
    const result = isAbsolutePath(absolutePath);
    expect(result).toBe(true);
  });
  it('Debera devolver falso para rutas relativas', () => {
    const relativePath = '../docs/01-milestone.md';
    const result = isAbsolutePath(relativePath);
    expect(result).toBe(false);
  });
  it('Debera devolver la ruta absoluta', () => {
    const absolutePath = 'C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md';
    const result = convertAbsolute(absolutePath);
    expect(result).toEqual(absolutePath);
  });

});
