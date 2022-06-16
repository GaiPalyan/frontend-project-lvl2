import _ from 'lodash';
import identSize from '../misc.js';

const stringifyNestedObject = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return String(node);
  }

  const keys = Object.keys(node);

  const result = keys.map((key) => {
    const stringify = stringifyNestedObject(node[key], depth + 1);
    return `${identSize.big(depth + 1)}${key}: ${stringify}\n`;
  });

  return `{\n${result.join('')}${identSize.big(depth)}}`;
};

const makeStylish = (tree, depth = 1) => {
  const treeStringify = (node, marker = '') => [
    identSize.standard(depth),
    marker, `${node.key}: ${stringifyNestedObject(node.value, depth)}`,
  ].join('');

  const mapper = {
    parent: (node) => `${identSize.big(depth)}${node.key}: ${makeStylish(node.children, depth + 1)}`,
    added: (node, marker = '+ ') => treeStringify(node, marker),
    deleted: (node, marker = '- ') => treeStringify(node, marker),
    unmodified: (node, marker = '  ') => treeStringify(node, marker),
    modified: (node) => [
      identSize.standard(depth),
      '- ', `${node.key}: ${stringifyNestedObject(node.before, depth)}\n`,
      identSize.standard(depth),
      '+ ', `${node.key}: ${stringifyNestedObject(node.after, depth)}`,
    ].join(''),
  };

  const mapped = tree.map((node) => mapper[node.type](node)).join('\n');
  return ['{', mapped, `${identSize.big(depth - 1)}}`].join('\n');
};

export default makeStylish;
