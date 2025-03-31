const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

const swapColumns = (n, m) => row => {
  const newRow = [...row];
  [newRow[n - 1], newRow[m - 1]] = [newRow[m - 1], newRow[n - 1]];
  return newRow;
};

export const swap = (data, n, m) => {

  if (data.length === 0) {
    throw new Error('El archivo CSV está vacío');
  }

  const numColumns = data[0].length;
  if (n < 1 || m < 1 || n > numColumns || m > numColumns) {
    throw new Error(`Los índices deben estar entre 1 y ${numColumns}`);
  }

  const transform = pipe(
    rows => rows.map(swapColumns(n, m)),
  );

  return transform(data);
};
