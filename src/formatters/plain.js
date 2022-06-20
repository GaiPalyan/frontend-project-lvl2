import _ from 'lodash';

const stringifyComplexValue = (value) => {
  if (!_.isObject(value)) {
    return _.isString(value) ? `'${value}'` : `${value}`;
  }

  return '[complex value]';
};

const makePlain = (tree, startOftLane = "'") => {
  const relevantNodes = tree.filter((node) => node.type !== 'unmodified');

  const mapper = {
    parent: (node, path) => makePlain(node.children, path),
    added: (node, path) => ['Property ', path, ' was added with value: ', stringifyComplexValue(node.value)].join(''),
    deleted: (node, path) => ['Property ', path, ' was removed'].join(''),
    modified: (node, path) => ['Property ', path, ' was updated. From ', stringifyComplexValue(node.before), ' to ', stringifyComplexValue(node.after)].join(''),
    default: () => 'Unknown node type',
  };
  return relevantNodes.flatMap((node) => {
    const fullPath = node.type === 'parent' ? `${startOftLane}${node.key}.` : `${startOftLane}${node.key}'`;
    return (mapper[node.type] || mapper.default)(node, fullPath);
  }).join('\n');
};

export default makePlain;
