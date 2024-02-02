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
  .command('$0', 'get weather', () => { }, (argv) => {
    run(argv);
  })
  .options({
    lat: {
      describe: 'Latitude',
      type: 'number',
    },
    lon: {
      describe: 'Longitude',
      type: 'number',
    },
    output: {
      alias: 'o',
      describe: 'Output file path. If not provided, output to stdout',
      type: 'string',
    },
    mode: {
      alias: 'm',
      describe: 'sets output data format, by default set \'json\'',
      default: 'json',
      choices: ['json', 'xml', 'html'],
    },
    city: {
      alias: 'c',
      describe: 'city name',
      type: 'string',
    },
    force: {
      alias: 'f',
      describe: 'overwrites the file if it already exists',
      boolean: true,
    },
  })
  // .demandOption(['lat', 'lon'], 'Please provide latitude and longitude')
  .parse();
