export function insert_row(data, rowIndex, newRow) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No hay datos disponibles.");
  }
  
  const columnCount = data[0].length;
  
  if (newRow.length > columnCount) {
    newRow = newRow.slice(0, columnCount);
  } else if (newRow.length < columnCount) {
    while (newRow.length < columnCount) {
      newRow.push("");
    }
  }
  
  if (rowIndex < 1) {
    throw new Error("No se puede insertar una fila antes del header.");
  }
  
  if (rowIndex >= data.length) {
    rowIndex = data.length;
  }
  
  data.splice(rowIndex, 0, newRow);
  return data;
}
