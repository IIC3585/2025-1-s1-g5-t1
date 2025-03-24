import { parseCSV } from './functions/csv_parser.js';
import { rowdelete } from './functions/rowdelete.js';
import { columndelete } from './functions/columndelete.js';
import { insertrow } from './functions/insertrow.js';


document.getElementById('parseTextBtn').addEventListener('click', () => {
  const csvText = document.getElementById('csvText').value;
  try {
    const data = parseCSV(csvText);
    document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
  } catch (error) {
    document.getElementById('resultado').textContent = 'Error: ' + error.message;
  }
});

document.getElementById('csvFileInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    parseCSV(file)
      .then(data => {
        document.getElementById('resultado').textContent = JSON.stringify(data, null, 2);
      })
      .catch(err => {
        document.getElementById('resultado').textContent = 'Error: ' + err.message;
      });
  }
});

document.getElementById('deleteRowBtn').addEventListener('click', () => {
  const csvText = document.getElementById('csvText').value; // Get CSV input from textarea
  const rowIndex = parseInt(prompt('¿Cuál fila quieres eliminar? (Índice empieza en 0)'), 10); // Ask for row index

  try {
    let data = parseCSV(csvText); // Parse the CSV text into an array
    data = rowdelete(data, rowIndex); // Delete the specified row
    document.getElementById('resultado').textContent = JSON.stringify(data, null, 2); // Show the result in JSON format
  } catch (error) {
    document.getElementById('resultado').textContent = 'Error: ' + error.message; // Handle errors
  }
});

document.getElementById('deleteColBtn').addEventListener('click', () => {
  const csvText = document.getElementById('csvText').value; // Get CSV input from textarea
  const colIndex = parseInt(prompt('¿Cuál columna quieres eliminar? (Índice empieza en 0)'), 10); // Ask for the column index

  try {
    let data = parseCSV(csvText); // Parse the CSV text
    data = columndelete(data, colIndex); // Delete the specified column
    document.getElementById('resultado').textContent = JSON.stringify(data, null, 2); // Display the result as JSON
  } catch (error) {
    document.getElementById('resultado').textContent = 'Error: ' + error.message; // Handle errors
  }
});
