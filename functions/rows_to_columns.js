import _ from 'lodash';
import { parseCSV } from './csv_parser.js';

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const toCSVString = data =>
  data.map(row => row.join(',')).join('\n');

const transpose = matrix => _.zip(...matrix);

export const rowsToColumns = async (fileContent) => {
  const data = await parseCSV(fileContent);
  
  const transform = pipe(
    transpose,
    toCSVString
  );

  return transform(data);
};
