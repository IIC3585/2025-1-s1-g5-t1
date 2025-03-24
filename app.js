import { parseCSV } from './functions/csv_parser.js';
import { rowdelete } from './functions/rowdelete.js';
import { columndelete } from './functions/columndelete.js';
import { insertrow } from './functions/insertrow.js';

let data = [];

function updatePreview() {
  const table = document.getElementById('csvPreview');
  table.innerHTML = ''; // Clear previous preview

  if (data.length === 0) {
    table.innerHTML = '<p>No hay datos para mostrar.</p>';
    return;
  }

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create header row
  const headerRow = document.createElement('tr');
  data[0].forEach((_, colIndex) => {
    const th = document.createElement('th');
    th.textContent = `Col ${colIndex + 1}`;
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body
  data.forEach(row => {
    const tr = document.createElement('tr');
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
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
  const rowIndex = parseInt(prompt('¿Cuál fila quieres eliminar? (Índice empieza en 0)'), 10);
  try {
    data = rowdelete(data, rowIndex);
    updatePreview();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

document.getElementById('deleteColBtn').addEventListener('click', () => {
  const colIndex = parseInt(prompt('¿Cuál columna quieres eliminar? (Índice empieza en 0)'), 10);
  try {
    data = columndelete(data, colIndex);
    updatePreview();
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

document.getElementById('insertRowBtn').addEventListener('click', () => {
  const rowIndex = parseInt(prompt('¿En qué fila quieres insertar? (Índice empieza en 0)'), 10);
  const newRow = prompt('Ingresa la nueva fila en formato CSV (ej: "valor1,valor2,valor3")');

  try {
    data = insertrow(data, rowIndex, newRow.split(','));
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
