/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

'use strict';

const config = require('config');
const { Logger } = require('./logger');
const { GearsRegistry } = require('./gears');

/**
 * The main MuchineryJS application class.
 * 
 * @name Muchinery
 * @summary The muchinery main block
 */
class Muchinery {
  constructor(options) {
    this.options = options || {};
    this.logger = Logger.getLogger(this.constructor.name);
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all(
          Object.keys(GearsRegistry.gears).map(async gearName => {
            this.logger.info(`bootstrapping ${gearName} gear: ${JSON.stringify(GearsRegistry.gear(gearName))}`);
            const gear = GearsRegistry.gear(gearName);
            gear.logger = this.logger;
            gear.muchinery = this;
            await gear.bootstrap(this._gearConfig(gearName), GearsRegistry.gearOptions(gearName));
          })
        );
    
        this.logger.info('Application bootstrapped');
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    
  }

  use(gear, options) {
    this.logger.debug(`registering ${gear.name} gear`);
    GearsRegistry.register(gear, options);
  }

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
