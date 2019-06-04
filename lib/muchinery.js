'use strict';

const config = require('config');
const { Logger } = require('./logger');

class Muchinery {
  constructor(options) {
    this.options = options || {};
    this.logger = Logger.getLogger(this.constructor.name);
    this.gears = {};
    this.gearsOptions = [];
  }

  async start() {
    return new Promise(async (resolve, reject) => {
      try {
        await Promise.all(
          Object.keys(this.gears).map(async gearName => {
            this.logger.info(`bootstrapping ${gearName} gear: ${JSON.stringify(this.gears[gearName])}`);
            const gear = this.gears[gearName];
            const gearOptions = this.gearsOptions[gearName];
            gear.logger = this.logger;
            gear.muchinery = this;
            await gear.bootstrap(this._gearConfig(gearName), gearOptions);
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
    this.gears[gear.name] = gear;
    this.gearsOptions[gear.name] = options;
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
