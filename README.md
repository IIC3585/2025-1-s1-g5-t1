# 2025-s1-g5-t1

# CSV Parser Modular en JavaScript

Este proyecto es una aplicación sencilla para parsear archivos CSV, ya sea a partir de un string o de un archivo subido por el usuario. El objetivo es transformar el CSV en una matriz (similar a una tabla en pandas) que se puede manipular con otras funciones posteriormente.

## Para ver y probar la aplicación en funcionamiento:

**Utiliza un Servidor Local**

No es necesario que corras ningún package manager para probar la aplicación, lodash se importa de forma especial para ello

Con la extensión Live Server en VS Code: Abre la carpeta del proyecto, haz clic derecho sobre index.html y selecciona "Open with Live Server"

## Estructura del Proyecto

proyecto/

├── index.html

├── styles.css

├── app.js

└── csv_parser.js

## Funcionalidades del Parser

### 1. `parseCSVString(csvString)`
- **Descripción:**  
  Función pura que recibe un string con formato CSV y lo transforma en una matriz.
- **Proceso:**  
  - Separa el string en líneas utilizando el salto de línea (`\n`).
  - Filtra líneas vacías.
  - Para cada línea, separa los campos usando la coma (`,`) como delimitador y elimina espacios en blanco extra.
- **Uso:**  
  Se utiliza cuando se recibe el CSV directamente como un string (por ejemplo, desde un `<textarea>`).

### 2. `parseCSVFile(file)`
- **Descripción:**  
  Función asíncrona que recibe un objeto `File` (subido mediante un input de tipo file) y utiliza un `FileReader` para leer el contenido.
- **Proceso:**  
  - Se crea una nueva instancia de `FileReader`.
  - Cuando el archivo se carga, se llama a `parseCSVString` sobre el contenido para transformar el CSV en una matriz.
  - Retorna una Promesa que se resuelve con la matriz resultante o se rechaza en caso de error.
- **Uso:**  
  Se invoca al seleccionar un archivo CSV desde el navegador.

### 3. `parseCSV(input)`
- **Descripción:**  
  Función principal que actúa como interfaz única para el parser.
- **Decisión de la Función a Utilizar:**  
  - **Si el input es un objeto `File`:**  
    Llama a `parseCSVFile` para procesar el archivo de forma asíncrona.
  - **Si el input es un `string`:**  
    Llama a `parseCSVString` para procesar el CSV de forma sincrónica.
  - **Si el input no es ninguno de los anteriores:**  
    Lanza un error indicando que el tipo de entrada no es soportado.

## Integración en la Interfaz (index.html)

El archivo `index.html` proporciona una interfaz sencilla con dos secciones principales:
- **Entrada de CSV como Texto:**  
  Un `<textarea>` y un botón para parsear el contenido ingresado.
- **Subida de Archivo CSV:**  
  Un `<input type="file">` para seleccionar un archivo CSV desde el computador.

### ¿Cómo se Trabaja con el Objeto Resultante?

El parser genera un **array de arrays** en el que cada sub-array representa una fila del CSV, y cada elemento dentro del sub-array es un campo (ya limpiado de espacios en blanco).

**Ejemplo:**

Si el CSV es:

nombre,apellido,mail

juan,perez,jperez@gmail.com

ana,flores,aflores@gmail.com

luis,prado,lprado@gmail.com


El objeto generado será:
```json
[
  ["nombre", "apellido", "mail"],
  ["juan", "perez", "jperez@gmail.com"],
  ["ana", "flores", "aflores@gmail.com"],
  ["luis", "prado", "lpado@gmail.com"]
]
```
