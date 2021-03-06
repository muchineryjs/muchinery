/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

/**
 * The MuchineryJs main module.
 * 
 * @module muchinery/index
 * @see muchinery/logger
 * @see muchinery/gears
 * @author Luca Stasio <joshuagame@gmail.com>
 */

require('reflect-metadata');
Promise = require('bluebird');
const muchinery = require('./muchinery');
const { LoggerFactory, LoggerInstance } = require('./logger');
const { createGear, GearsRegistry} = require('./gears');
const figlet = require('figlet');

LoggerFactory.setup();

const logger = LoggerFactory.getLogger('muchinery')

/**
 * Prints out initial startup informations
 */
function printStartup() {
  const logo = figlet.textSync('>>>MuchineryJS', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });
  const version = require('../package.json').version;
  
  logger.info(`===== Muchinery startup =====\n${logo}(${version})`);
  
  !process.env.NODE_ENV
    ? logger.info('no NODE_ENV provided, using default ["development"]')
    : logger.info(`environment = ${process.env.NODE_ENV}`);
}

/**
 * Initialize and returns the Muchinery application instance.
 * 
 * @param {Object} options - optional initial configuration options.
 * @returns {Muchinery} the Muchinery instance.
 */
function createMuchinery(options) {
  options = options || {};
  options.logger = options.logger || logger; 

  printStartup();
  
  // return new Muchinery(options);
  return muchinery(options);
}

module.exports = {
  muchinery: createMuchinery,
  LoggerFactory,
  LoggerInstance,
  createGear,
  GearsRegistry
};
