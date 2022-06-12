import identsSizes from '../misc.js';

const makePlainFormat = (tree) => {
  const mapped = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return [identsSizes.standard, '+ ', `${node.key}: ${node.value}`].join('');
      case 'deleted':
        return [identsSizes.standard, '- ', `${node.key}: ${node.value}`].join('');
      case 'modified':
        return [
          identsSizes.standard, `- ${node.key}: ${node.before}`, '\n',
          identsSizes.standard, `+ ${node.key}: ${node.after}`,
        ].join('');
      case 'unmodified':
        return [identsSizes.big, `${node.key}: ${node.value}`].join('');
      default:
        throw new Error('undefined node type');
    }
  }).join('\n');

  return ['{', mapped, '}'].join('\n');
};

export default makePlainFormat;
