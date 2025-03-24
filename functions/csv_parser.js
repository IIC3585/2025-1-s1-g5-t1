export function parseCSV(csvText) {
  return csvText.trim().split("\n").map(row => row.split(","));
}
