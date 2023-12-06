# Markdown Links

## Index

* [1. Caracteristicas](#1-Caracteristicas)
* [2. Instalacion](#2-Instalacion)
* [3. Modo de uso](#3-uso)
* [4. CLI](#4-cli)

***

## 1. Caracteristicas
* Valida su una ruta es relativa o absoluta.
* Convierte una ruta en absoluta.
* Valida que la ruta exista en el equipo
* valida que la ruta del archivo sea de tipo (.md | .markdown | mkd | mdown | mdtxt | mdtext).
* Valide los enlaces verificando el código de estado de respuesta con la biblioteca fetch.
* Estadísticas de cuántos enlaces hay, cuántos únicos y válidos.
* Se ejecuta desde CLI.

## 2. Instalacion
```
* Install dependencies
```js
npm install md-links910112
```

## 3. Uso
En un proyecto

mdlink
```js
mdLinks(nombreDelArchivo, isValidateSelected, idStatsSelected).then ((res) => console.log(res))
.catch((error) => console.log(error))
```

Validate function 
```js
Promise.all(codigoHTTP(contenido, validarExtensionURL))
            .then((links) => {
              resolve(links);
              })
```

Stats function 
```js
Promise.all(codigoHTTP(contenido))
          .then((links) => {
            const resultadosStats = statsFun(links, validate)
            resolve(resultadosStats);
          })
```

## 4. CLI

Obtener enlaces
```js
# single file
md-links <path/to/file.md>

# scan all markdown files in a folder
md-links <path/to/dir>
```

Validar enlaces
```js
md-links <path/to/dir> --validate
```

Obtener estadísticas
```js
md-links <path/to/dir> --stats

# validate and return stats
md-links <path/to/dir> --validate --stats
```