#!/usr/bin/env node
import { program } from 'commander';
import differ from '../src/index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.\n')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const result = differ(file1, file2, program.opts().format);
    console.log(result);
  })
  .parse();
