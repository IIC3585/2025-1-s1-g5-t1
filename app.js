import { parseCSV } from './functions/csv_parser.js';

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
