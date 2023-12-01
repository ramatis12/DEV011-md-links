
//const fs = require("fs");
const path = require("path");
const marked = require("marked");
const { isAbsolutePath, convertAbsolute, validarRuta, validarExtension, readFile, linksArray } = require("../src/funciones.js");


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
    const rutaInexistente = "C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\src\\01-milestone.md";
    const validacion = validarRuta(rutaInexistente);
    
    expect(validacion).toEqual(rutaInexistente);
  });

  it("Debera devolver la ruta validada si existe", () => {
    const rutaExistente ="C:\\Users\\Sara Ramirez Matias\\Desktop\\laboratoria\\docs\\01-milestone.md";
    return validarRuta(rutaExistente).then((rutaExistente) => {
    expect(rutaExistente).toBe(rutaExistente);
  })
  });

  it("Debera devolver true para una extensión de archivo Markdown válida", () => {
    const ruta = "../docs/01-milestone.md";
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(true);
  });

  it("Debera devolver true para una extensión de archivo Markdown con mayúsculas", () => {
    const ruta = "../README.md";
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(true);
  });

  it("Debera devolver false para una extensión de archivo no válida", () => {
    const ruta = "../docs/01-milestone.js";
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(false);
  });

  it("Debera devolver false para una ruta sin extensión", () => {
    const ruta = "../docs/01-milestone";
    const resultado = validarExtension(ruta);
    expect(resultado).toBe(false);
  });
  it("Debea devolver la extensión del archivo", () => {
    const ruta = "../docs/01-milestone.md";
    const formatted = ruta.toLowerCase();
    const fileExtension = formatted.split(".").pop();
    expect(fileExtension).toBe("md");
  });
  it("Debera leer un archivo MD", () => {
    const ruta = "./test/prueba.md";
    return expect(readFile(ruta)).resolves.toContain('<h1 id="markdown-links">Markdown Links</h1>');
  });
  it("Debera leer un archivo MD y crear el array de lectura", () => {
    const ruta = "./test/array.md";
    const array = [
      {
        file: "C:\\Users\\sramirezm\\Desktop\\laboratoria\\DEV011-md-links\\test\\array.md",
        href: "#1-pre%C3%A1mbulo",
        ok: false,
        status: "Error de conexión",
        text: "1. Preámbulo"
      }
    ];
    return expect(linksArray(ruta)).resolves.toEqual(array);
  });
});
