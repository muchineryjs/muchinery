/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

'use strict';

const config = require('config');
const { LoggerFactory } = require('./logger');
const { GearsRegistry } = require('./gears');

/**
 * The main MuchineryJS application class.
 * @name Muchinery
 * @summary The muchinery main block
 */
class Muchinery {
  constructor(options) {
    this.options = options || {};
    this.logger = LoggerFactory.getLogger(this.constructor.name);
  }

  /**
   * Start the muchinery application and bootstrap all of the registered Gears.
   * @returns {Promise}
   */
  async start() {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all(
          Object.keys(GearsRegistry.gears).map(async gearName => {
            this.logger.info(`bootstrapping ${gearName} gear`);
            // const gear = GearsRegistry.gear(gearName);
            // const gearOptions = GearsRegistry.gearOptions(gearName); 
            const gear = GearsRegistry.gear(gearName);
            gear.instance.logger = gear.instance.logger || this.logger;
            await gear.instance.bootstrap(this._gearConfig(gearName), gear.options);
          })
        );
    
        this.logger.info('Application bootstrapped');
        this.logger.info('===== startup done =====');
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Register a Gear instance into the GearsRegister.
   * This is a comody method to be used to chain registration.
   * @param {Object} gear - the gear instance to register.
   * @param {Object} options - the gear custom options to register.
   */
  use(gear, options) {
    this.logger.debug(`registering ${gear.name} gear`);
    GearsRegistry.register(gear, options);
    return this;
  }

  /**
   * Gets gear configuration. It search for configuration in the following way:
   *    1- search in the muchinery options object
   *    2- if not found, search in the custion gear options
   *    3- if not found, search in the configuration files
   * @private
   * @param {string} gearName - the gear name to search info for.
   */
  _gearConfig(gearName) {
    let gearConfig;
    try {
      gearConfig = (this.options.gears && this.options.gears[gearName]) ?
        this.options.gears[gearName] :
        config.get(`muchinery.gears.${gearName}`); 
    } catch(err) {
      this.logger.error(`configuration not found for component ${gearName}`);
      process.exit(1);
    }
    
    this.logger.debug(`${gearName} config: ${JSON.stringify(gearConfig)}`);
    return gearConfig;
  }

}

module.exports = Muchinery;
