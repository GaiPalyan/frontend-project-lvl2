const identSize = {
  standard: (depth, str = ' ') => str.repeat(depth * 4 - 2),
  big: (depth, str = ' ') => str.repeat(depth * 4),
};

export default identSize;
