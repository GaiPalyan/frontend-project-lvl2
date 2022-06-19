import _ from 'lodash';

const makeJson = (tree) => JSON.stringify(_.cloneDeep(...tree));
export default makeJson;
