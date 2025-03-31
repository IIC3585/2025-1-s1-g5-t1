export function insert_column(data, colIndex, newColumn) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error("No hay datos disponibles.");
    }
    
    const rowCount = data.length;
    const currentColumnCount = data[0].length;
    
    let newColIndex = colIndex - 1;
    
    if (newColIndex < 0) {
      throw new Error("El índice de columna debe ser mayor o igual a 1.");
    }
    
    if (newColIndex >= currentColumnCount) {
      newColIndex = currentColumnCount;
    }
    
    if (!Array.isArray(newColumn)) {
      throw new Error("newColumn debe ser un arreglo.");
    }
    
    if (newColumn.length > rowCount) {
      newColumn = newColumn.slice(0, rowCount);
    } else if (newColumn.length < rowCount) {
      while (newColumn.length < rowCount) {
        newColumn.push("");
      }
    }
    
    for (let i = 0; i < rowCount; i++) {
      data[i].splice(newColIndex, 0, newColumn[i]);
    }
    
    return data;
  }
  