#!/usr/bin/env node

import process from 'node:process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import run from '../src/index.js';

yargs(hideBin(process.argv))
  .usage('Usage: $0 [options]')
  .help('help')
  .alias('help', 'h')
  .strict()
  .option('lat', {
    describe: 'Latitude',
    type: 'number',
  })
  .option('lon', {
    describe: 'Longitude',
    type: 'number',
  })
  .option('output', {
    alias: 'o',
    describe: 'Output file path. If not provided, output to stdout',
    type: 'string',
  })
  .option('mode', {
    describe: 'Information output mode',
    type: 'string',
  })
  .option('force', {
    alias: 'f',
    describe: 'This parameter is specified for overwriting data to a file, if it exists.',
    type: 'boolean',
  })
  .choices('mode', ['json', 'xml', 'html'])
  .default('mode', 'json')
  .demandOption(['lat', 'lon'], 'Please provide latitude and longitude')
  .command('$0', 'get weather', {}, (argv) => {
    run(argv);
  })
  .parse();
