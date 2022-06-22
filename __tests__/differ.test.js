import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import differ from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getPathToFile = (filename) => join(__dirname, '__fixtures__', filename);

const data = [
  {
    expected: 'stylish',
    file1: 'complexJson1.json',
    file2: 'complexJson2.json',
    extension: 'json',
    format: 'stylish',
  },
  {
    expected: 'stylish',
    file1: 'complexYaml1.yml',
    file2: 'complexYaml2.yml',
    extension: 'yml',
    format: 'stylish',
  },
  {
    expected: 'plain',
    file1: 'complexJson1.json',
    file2: 'complexJson2.json',
    extension: 'json',
    format: 'plain',
  },
  {
    expected: 'plain',
    file1: 'complexYaml1.yml',
    file2: 'complexYaml2.yml',
    extension: 'yml',
    format: 'plain',
  },
  {
    expected: 'json',
    file1: 'complexJson1.json',
    file2: 'complexJson2.json',
    extension: 'json',
    format: 'json',
  },
];

describe.each(data)('differ', (diff) => {
  const expected = readFileSync(getPathToFile(diff.expected), 'utf8');
  const actual = differ(
    getPathToFile(diff.file1),
    getPathToFile(diff.file2),
    diff.format,
  );
  test(`.${diff.extension} files compare -f ${diff.format} output format test`, () => {
    expect(actual).toEqual(expected);
  });
});
