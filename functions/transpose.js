import _ from 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.js';

const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);
const transpose = matrix => _.zip(...matrix);

export const columnsToRows = (data) => {
  const transform = pipe(
    transpose
  );
  return transform(data);
};

export const rowsToColumns = (data) => {
  const transform = pipe(
    transpose
  );
  return transform(data);
};
