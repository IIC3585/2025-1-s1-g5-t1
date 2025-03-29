import _ from 'lodash';

// Pipe helper (composición funcional)
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

// Intercambia elementos en un array de acuerdo a índices
const swapColumns = (n, m) => row => {
  const newRow = [...row];
  [newRow[n - 1], newRow[m - 1]] = [newRow[m - 1], newRow[n - 1]];
  return newRow;
};

// Convierte una matriz a CSV string
const toCSVString = data =>
  data.map(row => row.join(',')).join('\n');

// Función principal
export const swap = async (file, n, m) => {
    const data = await parseCSV(file); // Usa tu parseCSV ya definido

    const transform = pipe(
        rows => rows.map(swapColumns(n, m)), // swap de columnas
        toCSVString
    );

    return transform(data);
};

// Transpone una matriz (convierte filas en columnas)
const transpose = matrix => 
  _.zip(...matrix);

// Función principal para convertir filas a columnas
export const rowsToColumns = async (file) => {
  const data = await parseCSV(file);
  
  const transform = pipe(
      transpose,
      toCSVString
  );

  return transform(data);
};

// Función principal para convertir columnas a filas
export const columnsToRows = async (file) => {
  const data = await parseCSV(file);
  
  const transform = pipe(
      transpose, // Usamos la misma función transpose que ya existe
      toCSVString
  );

  return transform(data);
};