export const insertrow = (file, n, row) => {
    if (n < 0 || n >= file.length) {
      throw new Error('Índice de fila fuera de rango.');
    }
    if (!Array.isArray(row) || row.length !== file[0].length) {
      throw new Error('La nueva fila debe tener la misma longitud que las columnas del CSV.');
    }
    file.splice(n + 1, 0, row);
    return file;
  };
  