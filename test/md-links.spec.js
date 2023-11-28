const fs = require("fs");
const path = require("path");
const marked = require('marked');
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, readFile, mdLinks } = require("../src/funciones.js");

jest.mock("fs");


describe("mdLinks", () => {
  it("Es una funcion", () => {
    expect(typeof mdLinks).toBe("function");
  });
  it("Debera devolver verdadero para rutas absolutas", () => {
    const absolutePath =
      "C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md";
    const result = isAbsolutePath(absolutePath);
    expect(result).toBe(true);
  });
  it("Debera devolver falso para rutas relativas", () => {
    const relativePath = "../docs/01-milestone.md";
    const result = isAbsolutePath(relativePath);
    expect(result).toBe(false);
  });
  it("Debera devolver la ruta absoluta", () => {
    const absolutePath = "C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md";
    const result = convertAbsolute(absolutePath);
    expect(result).toEqual(absolutePath);
  });

  it("Debera imprimir un mensaje si la ruta no existe", () => {
    const rutaInexistente = "C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\src\\01-milestone.md";;
   const validacion = validarRuta(rutaInexistente);
    expect(validacion).toEqual(rutaInexistente);
  });

  it("Debera devolver la ruta validada si existe", () => {
    const rutaExistente = "C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md";;
   const validacion = validarRuta(rutaExistente);
    expect(validacion).toEqual(rutaExistente);
  });

  it('Debera devolver true para una extensión de archivo Markdown válida', () => {
    const ruta = '../docs/01-milestone.md';
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(true);
  });

  it('Debera devolver true para una extensión de archivo Markdown con mayúsculas', () => {
    const ruta = '../README.md'; 
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(true);
  });

  it('Debera devolver false para una extensión de archivo no válida', () => {
    const ruta = '../docs/01-milestone.js';
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(false);
  });

  it('Debera devolver false para una ruta sin extensión', () => {
    const ruta = '../docs/01-milestone'; 
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(false);
  });
  

  it('Debea devolver la extensión del archivo', () => {
    const ruta =  '../docs/01-milestone.md';
  const formatted = ruta.toLowerCase();
  const fileExtension = formatted.split(".").pop();
    expect(fileExtension).toBe('md');
  });

// it('should log a message and resolve with an empty array if the extension is not valid', () => {
//     validarExtension.mockReturnValue(false);
//     return processFile('../docs/01-milestone.md').then((result) => {
//       expect(validarExtension).toHaveBeenCalledWith('.md');
//       expect(console.log).toHaveBeenCalledWith('No es un archivo Markdown');
//       expect(result).toEqual([]);
//     });
//   });
});

// Mockear la función de validarExtension
// jest.mock('../src/funciones.js', () => ({
//   ...jest.requireActual('../src/funciones.js'), 
//   validarExtension: jest.fn(),
// }));

jest.mock('marked', () => ({
  parse: jest.fn(),
}));

describe('readFile', () => {
  it('Debera resolverse con el contenido analizado si la extensión del archivo es válida', () => {
    validarExtension(true);

    const mockContent = 'Contenido del archivo Markdown';
    jest.spyOn(fs, 'readFile').mockImplementation((route, encoding, callback) => {
      callback(null, mockContent);
    });
    const mockFilteredContent = 'Contenido filtrado del archivo Markdown';
    marked.parse.mockReturnValue(mockFilteredContent);
    return readFile('../docs/01-milestone.md').then((result) => {
      expect(validarExtension).toHaveBeenCalledWith('.md');
      expect(marked.parse).toHaveBeenCalledWith(mockContent);
      expect(result).toEqual(mockFilteredContent);
    });
  });
});