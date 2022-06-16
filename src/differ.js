import * as fs from 'fs';
import { resolve, extname } from 'path';
import _ from 'lodash';
import parserController from './parserController.js';
import makeStylish from './formatters/stylish.js';

const makeAST = (fileData1, fileData2) => {
  const sortedKeys = Object.keys({ ...fileData1, ...fileData2 }).sort();

  return sortedKeys.map((key) => {
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      const children = makeAST(fileData1[key], fileData2[key]);
      return {
        key,
        type: 'parent',
        children,
      };
    }
    if (!Object.prototype.hasOwnProperty.call(fileData1, key)) {
      return {
        key,
        value: fileData2[key],
        type: 'added',
      };
    }
    if (!Object.prototype.hasOwnProperty.call(fileData2, key)) {
      return {
        key,
        value: fileData1[key],
        type: 'deleted',
      };
    }
    if (fileData1[key] === fileData2[key]) {
      return {
        key,
        value: fileData1[key],
        type: 'unmodified',
      };
    }
    return {
      key,
      type: 'modified',
      before: fileData1[key],
      after: fileData2[key],
    };
  });
};

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

const differ = (filepath1, filepath2) => {
  const tree = makeAST(
    getFileData(filepath1),
    getFileData(filepath2),
  );
  return `${makeStylish(tree)}\n`;
};

export { makeAST, differ };
