#!/usr/bin/env node

import process from 'node:process';
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

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
  .option('mode', {
    describe: 'Information output mode',
    type: 'string',
  })
  .choices('mode', ['json', 'xml', 'html'])
  .default('mode', 'json')
  .demandOption(['lat', 'lon'], 'Please provide latitude and longitude')
  .command('$0', 'get weather', () => { }, (argv) => {
    console.log(argv);
  })
  .parse();
