export function rowdelete(data, rowIndex) {
    if (rowIndex <= 0 || rowIndex >= data.length) throw new Error("Índice fuera de rango");
    data.splice(rowIndex, 1);
    return data;
  }
  