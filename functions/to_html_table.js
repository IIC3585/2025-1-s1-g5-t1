export function toHtmlTable(data) {
    if (data.length === 0) return null;
  
    const table = document.createElement('table');
  
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
  
    const indexTh = document.createElement('th');
    indexTh.textContent = '#';
    headerRow.appendChild(indexTh);
  
    data[0].forEach((headerName, colIndex) => {
      const th = document.createElement('th');
      th.textContent = `Col ${colIndex + 1}: ${headerName.trim()}`;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
  
    const tbody = document.createElement('tbody');
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
  
    return table;
  }
  