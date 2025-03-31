# 2025-s1-g5-t1

# CSV Parser Modular en JavaScript

Este proyecto es una aplicación sencilla para parsear archivos CSV, ya sea a partir de un string o de un archivo subido por el usuario. El objetivo es transformar el CSV en una matriz y poder realizar operaciones sobre ella. En esta demo (se comenta luego como correrla de forma sencilla), se pueden hacer las operaciones mediante botones.

## Para ver y probar la aplicación en funcionamiento:

**Utiliza un Servidor Local**

No es necesario que corras ningún package manager para probar la aplicación, lodash se importa de forma especial para ello

Con la extensión Live Server en VS Code: Abre la carpeta del proyecto, haz clic derecho sobre index.html y selecciona "Open with Live Server"

## Estructura del Proyecto

proyecto/

├── functions/ (contiene las funciones)

├── samples/ (contiene un ejemplo de texto y uno de csv)

├── index.html

├── index.css

└── app.js

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

### 4. `swap(data, n, m)`
- **Descripción:**  
  Función que intercambia dos columnas en una matriz de datos CSV.
- **Parámetros:**
  - `data`: Matriz de datos (array de arrays)
  - `n`: Índice de la primera columna a intercambiar (basado en 1)
  - `m`: Índice de la segunda columna a intercambiar (basado en 1)
- **Proceso:**
  - Verifica que la matriz no esté vacía
  - Valida que los índices estén dentro del rango válido de columnas
  - Intercambia las columnas especificadas en cada fila de la matriz
- **Uso:**  
  Se utiliza cuando se necesita reordenar columnas en los datos CSV.
- **Ejemplo:**
```json
// Entrada:
[
  ["nombre", "apellido", "mail"],
  ["juan", "perez", "jperez@gmail.com"]
]

// swap(data, 1, 2) resulta en:
[
  ["apellido", "nombre", "mail"],
  ["perez", "juan", "jperez@gmail.com"]
]
```

### 5. Funciones de Transposición
#### `columnsToRows(data)` y `rowsToColumns(data)`
- **Descripción:**  
  Funciones que permiten transponer la matriz de datos, convirtiendo filas en columnas y viceversa.
- **Parámetro:**
  - `data`: Matriz de datos (array de arrays)
- **Proceso:**
  - Utiliza la función `_.zip` de Lodash para realizar la transposición de la matriz
- **Uso:**  
  Útil cuando se necesita cambiar la orientación de los datos, por ejemplo, para análisis o visualización.
- **Ejemplo:**
```json
// Entrada:
[
  ["A", "B", "C"],
  ["1", "2", "3"]
]

// columnsToRows(data) resulta en:
[
  ["A", "1"],
  ["B", "2"],
  ["C", "3"]
]
```

### 6. `row_delete(data, rowIndex)`
- **Descripción:**  
  Función que elimina una fila específica de la matriz de datos CSV.
- **Parámetros:**
  - `data`: Matriz de datos (array de arrays)
  - `rowIndex`: Índice de la fila a eliminar (basado en 1)
- **Proceso:**
  - Verifica que el índice esté dentro del rango válido de filas
  - Utiliza el método `splice` para eliminar la fila especificada
  - Retorna la matriz modificada
- **Uso:**  
  Se utiliza cuando se necesita eliminar una fila específica de los datos CSV.
- **Ejemplo:**
```json
// Entrada:
[
  ["nombre", "apellido", "mail"],
  ["juan", "perez", "jperez@gmail.com"],
  ["ana", "flores", "aflores@gmail.com"]
]

// row_delete(data, 2) resulta en:
[
  ["nombre", "apellido", "mail"],
  ["ana", "flores", "aflores@gmail.com"]
]
```

### 7. `column_delete(data, colIndex)`
- **Descripción:**  
  Función que elimina una columna específica de la matriz de datos CSV.
- **Parámetros:**
  - `data`: Matriz de datos (array de arrays)
  - `colIndex`: Índice de la columna a eliminar (basado en 1)
- **Proceso:**
  - Verifica que la matriz no esté vacía y que el índice esté dentro del rango válido de columnas
  - Utiliza `map` y `filter` para crear una nueva matriz sin la columna especificada
  - Retorna la matriz modificada
- **Uso:**  
  Se utiliza cuando se necesita eliminar una columna específica de los datos CSV.
- **Ejemplo:**
```json
// Entrada:
[
  ["nombre", "apellido", "mail"],
  ["juan", "perez", "jperez@gmail.com"]
]

// column_delete(data, 2) resulta en:
[
  ["nombre", "mail"],
  ["juan", "jperez@gmail.com"]
]
```

### 8. `insert_row(data, rowIndex, newRow)`
- **Descripción:**  
  Función que inserta una nueva fila en una posición específica de la matriz de datos CSV.
- **Parámetros:**
  - `data`: Matriz de datos (array de arrays)
  - `rowIndex`: Índice donde se insertará la nueva fila (basado en 1)
  - `newRow`: Array con los valores de la nueva fila
- **Proceso:**
  - Verifica que la matriz no esté vacía
  - Ajusta la longitud de la nueva fila para que coincida con el número de columnas existentes
  - Valida que el índice de inserción sea válido (no antes del header)
  - Inserta la nueva fila en la posición especificada
  - Retorna la matriz modificada
- **Uso:**  
  Se utiliza cuando se necesita agregar una nueva fila de datos al CSV.
- **Ejemplo:**
```json
// Entrada:
[
  ["nombre", "apellido", "mail"],
  ["juan", "perez", "jperez@gmail.com"]
]

// insert_row(data, 2, ["ana", "flores", "aflores@gmail.com"]) resulta en:
[
  ["nombre", "apellido", "mail"],
  ["ana", "flores", "aflores@gmail.com"],
  ["juan", "perez", "jperez@gmail.com"]
]
```

## Integración en la Interfaz (index.html)

El archivo `index.html` proporciona una interfaz sencilla con cinco secciones principales:
- **Entrada de CSV como Texto:**  
  Un `<textarea>` y un botón para parsear el contenido ingresado.
- **Subida de Archivo CSV:**  
  Un `<input type="file">` para seleccionar un archivo CSV desde el computador.
- **Botones:**  
  Varios `<buttons>` para seleccionar la operación sobre la tabla.
- **Descargar CSV:**  
  Un `<button>` para descargar el csv resultante.
- **Preview:**  
  Una gran visualización sobre la `<table>` en html que se actualiza con las operaciones de los botones.

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
