import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { differ } from '../src/differ.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getPathToFile = (...path) => join(__dirname, ...path);
const expected = readFileSync(getPathToFile('__fixtures__', 'plain'), 'utf8');
const actual = differ(
  getPathToFile('..', 'fixtures', 'file1.json'),
  getPathToFile('..', 'fixtures', 'file2.json'),
);

test('plain compare', () => {
  expect(expected).toEqual(actual);
});
