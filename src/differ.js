import * as _ from "lodash";
import * as fs from "fs";
import { resolve } from 'path'

const genDiff = (filepath1, filepath2) => {
    const fileData1 = getFileData(resolve(filepath1));
    const fileData2 = getFileData(resolve(filepath2));
    const sortedKeys = Object.keys(Object.assign(fileData1, fileData2)).sort();

    console.log(_.toLower);
    //const t = _.toLower(sortedKeys[1]);

    const mapped = sortedKeys.map((key) => {

    })
}

const readFile = (filepath) => {
    if (!fs.existsSync(filepath)) {
        throw new Error('File is not exist!');
    }

    return fs.readFileSync(filepath, 'utf8');
}

const getFileData = (filepath) => {
    try {
        return JSON.parse(readFile(filepath));
    } catch (err) {
        console.log(err.message);
    }
}

export default genDiff;
