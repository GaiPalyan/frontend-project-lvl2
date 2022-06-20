import fs from 'fs';
import { extname, resolve } from 'path';
import parserController from './parserController.js';
import formatterController from './formatters/index.js';
import treeBuilder from './treeBuilder.js';

const readFile = (filepath) => {
  if (!fs.existsSync(filepath)) {
    throw new Error('File is not exist!');
  }
  return fs.readFileSync(filepath, 'utf8');
};

const getFileData = (filepath) => {
  const fileContent = readFile(resolve(filepath));
  const extension = extname(filepath);

  try {
    return parserController(fileContent, extension);
  } catch (err) {
    console.log(err.message);
    return false;
  }
};

const differ = (filepath1, filepath2, format) => {
  const tree = treeBuilder(
    getFileData(filepath1),
    getFileData(filepath2),
  );
  return formatterController(tree, format);
};

export default differ;
