import makeStylish from './stylish.js';
import makePlain from './plain.js';
import makeJson from './json.js';

const formatterController = (tree, format) => {
  const map = {
    stylish: () => makeStylish(tree),
    plain: () => makePlain(tree),
    json: () => makeJson(tree),
    default: () => 'Unknown format',
  };
  return (map[format] || map.default)();
};

export default formatterController;
