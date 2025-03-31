import { parseCSV } from './functions/csv_parser.js';
import { row_delete } from './functions/row_delete.js';
import { column_delete } from './functions/column_delete.js';
import { insert_row } from './functions/insert_row.js';
import { toHtmlTable } from './functions/to_html_table.js';


let data = [];

function updatePreview() {
  const container = document.getElementById('csvPreview');
  container.innerHTML = '';

  if (data.length === 0) {
    container.innerHTML = '<p>No hay datos para mostrar.</p>';
    return;
  }

  const table = toHtmlTable(data);
  if (table) container.appendChild(table);
}

document.getElementById('parseTextBtn').addEventListener('click', () => {
  const csvText = document.getElementById('csvText').value;
  try {
    data = parseCSV(csvText);
    updatePreview();
  } catch (error) {
    alert('Error al cargar CSV: ' + error.message);
  }
});

document.getElementById('csvFileInput').addEventListener('change', event => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        data = parseCSV(e.target.result);
        updatePreview();
      } catch (error) {
        alert('Error al cargar CSV: ' + error.message);
      }
    };
    reader.readAsText(file);
  }
});

document.getElementById('deleteRowBtn').addEventListener('click', () => {
  const input = prompt('¿Cuál fila quieres eliminar? (Índice empieza en 1)');
  if (input === null) {
    return;
  }
  
  const rowIndex = parseInt(input, 10);
  if (isNaN(rowIndex)) {
    alert('Índice inválido.');
    return;
  }
  
  try {
    data = row_delete(data, rowIndex);
    updatePreview();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});


document.getElementById('deleteColBtn').addEventListener('click', () => {
  const colIndex = parseInt(prompt('¿Cuál columna quieres eliminar? (Índice empieza en 1)'), 10);
  try {
    data = column_delete(data, colIndex);
    updatePreview();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

document.getElementById('insertRowBtn').addEventListener('click', () => {
  const rowIndex = parseInt(prompt('¿En qué fila quieres insertar? (Índice empieza en 0)'), 10);
  const newRow = prompt('Ingresa la nueva fila en formato CSV (ej: "valor1,valor2,valor3")');

  try {
    data = insert_row(data, rowIndex, newRow.split(','));
    updatePreview();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

function convertToCSV(data) {
  return data.map(row => row.join(",")).join("\n");
}

document.getElementById('downloadCSV').addEventListener('click', () => {
  if (data.length === 0) {
    alert('No hay datos para exportar.');
    return;
  }

  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'modified.csv';
  link.click();
});
