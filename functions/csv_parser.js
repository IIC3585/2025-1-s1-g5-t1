export const parseCSVString = csvString =>
    csvString
      .split('\n')
      .filter(line => line.trim() !== '') 
      .map(line =>
        line.split(',')
            .map(field => field.trim())
      );

export const parseCSVFile = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = event => {
      try {
        const result = parseCSVString(event.target.result);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = error => reject(error);
    reader.readAsText(file);
  });

export const parseCSV = input => {
  if (input instanceof File) {
    return parseCSVFile(input);
  }
  if (typeof input === 'string') {
    return parseCSVString(input);
  }
  throw new Error('Tipo de entrada no soportado.');
};
