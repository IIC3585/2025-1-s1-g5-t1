import { parseCSV } from './functions/csv_parser.js';
import { rowdelete } from './functions/rowdelete.js';
import { columndelete } from './functions/columndelete.js';
import { insertrow } from './functions/insertrow.js';

let data = [];

function updatePreview() {
  const table = document.getElementById('csvPreview');
  table.innerHTML = '';

  if (data.length === 0) {
    table.innerHTML = '<p>No hay datos para mostrar.</p>';
    return;
  }

  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  const headerRow = document.createElement('tr');
  
  const indexTh = document.createElement('th');
  indexTh.textContent = '#';
  headerRow.appendChild(indexTh);
  
  data[0].forEach(headerName => {
    const th = document.createElement('th');
    th.textContent = headerName.trim();
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const tr = document.createElement('tr');
    
    const indexTd = document.createElement('td');
    indexTd.textContent = i;
    tr.appendChild(indexTd);
    
    row.forEach(cell => {
      const td = document.createElement('td');
      td.textContent = cell;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
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
  const input = prompt('¿Cuál fila quieres eliminar? (Índice empieza en 0)');
  if (input === null) {
    return;
  }
  
  const rowIndex = parseInt(input, 10);
  if (isNaN(rowIndex)) {
    alert('Índice inválido.');
    return;
  }
  
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
