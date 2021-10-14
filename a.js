const pick = require('./src/utils/pick');

const a = { ddd: 585, cadsd: 'dsd', bababa: 'djsld' };

const b = pick(a, ['ddd', 'cadsd', 'dsadad']);

console.log(b);
