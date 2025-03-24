export function insertrow(data, rowIndex, newRow) {
    if (rowIndex < 0 || rowIndex > data.length) throw new Error("Índice fuera de rango");
    data.splice(rowIndex, 0, newRow);
    return data;
  }
  