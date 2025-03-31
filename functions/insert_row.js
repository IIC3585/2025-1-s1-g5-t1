export function insert_row(data, rowIndex, newRow) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No data available.");
  }
  
  const columnCount = data[0].length;

  if (newRow.length > columnCount) {
    newRow = newRow.slice(0, columnCount);
  } else if (newRow.length < columnCount) {
    while (newRow.length < columnCount) {
      newRow.push("");
    }
  }

  if (rowIndex < 0 || rowIndex > data.length) {
    throw new Error("Invalid row index.");
  }

  data.splice(rowIndex, 0, newRow);
  return data;
}
