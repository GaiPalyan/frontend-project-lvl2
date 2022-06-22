import _ from 'lodash';

/*
Before compare two nested files let's make abstract tree and implement params for single node
*/
const treeBuilder = (fileData1, fileData2) => {
  const sortedKeys = _.sortBy(Object.keys({ ...fileData1, ...fileData2 }));

  return sortedKeys.map((key) => {
    if (_.isObject(fileData1[key]) && _.isObject(fileData2[key])) {
      const children = treeBuilder(fileData1[key], fileData2[key]);
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

export default treeBuilder;
