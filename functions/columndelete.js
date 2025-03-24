export const columndelete = (file, n) => {
    if (file.length === 0 || n < 0 || n >= file[0].length) {
      throw new Error('Índice de columna fuera de rango.');
    }
    file.forEach(row => row.splice(n, 1));
    return file;
  };
  