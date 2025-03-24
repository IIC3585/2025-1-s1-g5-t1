export const rowdelete = (file, n) => {
    if (n < 0 || n >= file.length) {
      throw new Error('Índice de fila fuera de rango.');
    }
    file.splice(n, 1);
    return file;
  };
  