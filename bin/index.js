#!/usr/bin/env node

// Set options as a parameter, environment variable, or rc file.
// eslint-disable-next-line no-global-assign
require = require("esm")(module/* , options */)
const yargs = require('yargs');

function parseArguments() {
  const commands = yargs
    .command('get', 'Show exisiting task list')
    .command('done <task-id>', 'Set specific task to done')
    .command('refresh', 'Get newest data from server')
    .command('upload', 'Send local update to server')
    .demandCommand()
    .help()
    .argv;
  return commands;
}

module.exports = require("../src/main.js").cli(parseArguments())