export function insertrow(data, rowIndex, newRow) {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error("No data available.");
  }
  
  const columnCount = data[0].length; // Get number of columns in existing table

  // Ensure new row has the correct number of columns
  if (newRow.length > columnCount) {
    newRow = newRow.slice(0, columnCount); // Trim excess values
  } else if (newRow.length < columnCount) {
    while (newRow.length < columnCount) {
      newRow.push(""); // Fill with empty strings
    }
  }

  if (rowIndex < 0 || rowIndex > data.length) {
    throw new Error("Invalid row index.");
  }

  data.splice(rowIndex, 0, newRow); // Insert row at the specified index
  return data;
}
