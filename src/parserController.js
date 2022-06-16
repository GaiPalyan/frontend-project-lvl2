import jsYaml from 'js-yaml';

const parserController = (fileContent, extension) => {
  switch (extension) {
    case '.json':
      return JSON.parse(fileContent);
    case '.yml':
    case '.yaml':
      return jsYaml.load(fileContent, 'utf-8');
    default:
      throw new Error(`Unknowing file extension ${extension}`);
  }
};

export default parserController;
