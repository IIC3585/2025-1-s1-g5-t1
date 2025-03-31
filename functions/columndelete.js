export function columndelete(data, colIndex) {
    if (data.length === 0 || colIndex <= 0 || colIndex > data[0].length) throw new Error("Índice fuera de rango");
    return data.map(row => row.filter((_, i) => i !== colIndex - 1));
  }
  