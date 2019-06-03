'use strict';

const config = require('config');
const container = require('./container');
const asClass = container.asClass;

class Muchinery {
  constructor(options) {
    this.options = options || {};
    this.log = this.options.log;
    this.gears = [];
  }

  start() {
    container.loadModules([
      'services/**/*.js',
      'repositories/**/*.js',
    ], {
      formatName: 'camelCase',
      resolverOptions: {
        register: asClass
      }
    });

    this.log.info('services and repositories registered');

    this.gears.forEach(gearName => {
      this.log.info(`bootstrapping ${gearName}`);
      
      let gearConfig;
      try {
        gearConfig = (this.options.gears && this.options.geats[gearName]) ?
          this.options.gears[gearName] :
          config.get(`muchinery.gears.${gearName}`); 
      } catch(err) {
        this.log.error(`configuration not found for component ${gearName}`);
        process.exit(1);
      }
      
      const gear = container.resolve(gearName);
      // gear.config = gearConfig;
      gear.logger = this.log;
      gear.bootstrap(gearConfig);
    });

    this.log.info('Application bootstrapped');
  }

  use(gear, name = null) {
    console.log('******************** ' + gear.name);
    const gearName = name || gear.name;
    this.log.debug('gearName: ' + gearName);
    let registrar = {};
    registrar[gearName] = asClass(gear);
    registrar.formatName = 'cameCase';

    this.log.debug('gear registrar: ' + JSON.stringify(registrar));
    // container.register(registrar,  { formatName: 'camelCase' });
    container.register(registrar);
    this.gears.push(gearName);
  }

}

module.exports = Muchinery;
