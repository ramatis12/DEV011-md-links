const fs = require("fs");
const path = require("path");
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, mdLinks } = require("../src/funciones.js");

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

  
});
