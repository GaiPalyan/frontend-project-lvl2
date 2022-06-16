import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { differ } from '../src/differ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (...path) => join(__dirname, ...path);

const expected = readFileSync(getPathToFile('__fixtures__', 'complex'), 'utf8');
const actualJsonComparison = differ(
  getPathToFile('__fixtures__', 'complexJson1.json'),
  getPathToFile('__fixtures__', 'complexJson2.json'),
);

const actualYamlComparison = differ(
  getPathToFile('__fixtures__', 'complexJson1.json'),
  getPathToFile('__fixtures__', 'complexJson2.json'),
);

test('complex .json comparison', () => {
  expect(expected).toEqual(actualJsonComparison);
});

test('complex .yml comparison', () => {
  expect(expected).toEqual(actualYamlComparison);
});
