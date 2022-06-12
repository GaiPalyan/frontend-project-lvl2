#!/usr/bin/env node
import { program } from 'commander';
import { differ } from '../src/differ.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.\n')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    console.log(differ(file1, file2));
  })
  .parse();
