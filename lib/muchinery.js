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

  async start() {
    return new Promise(async (resolve, reject) => {
      try {
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
        await Promise.all(
          this.gears.map(async gearName => {
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
            
            this.log.info(`${gearName} config: ${JSON.stringify(gearConfig)}`);
            const gear = container.resolve(gearName);
            // gear.config = gearConfig;
            gear.logger = this.log;
            await gear.bootstrap(gearConfig);
          })
        );
    
        this.log.info('Application bootstrapped');
        resolve();
      } catch (err) {
        reject(err);
      }
    });
    
  }

  use(gear, name = null) {
    const gearName = name || gear.name;
    this.log.debug('gearName: ' + gearName);
    
    let registrar = {};
    registrar[gearName] = asClass(gear);
    registrar.formatName = 'cameCase';

    this.log.debug('gear registrar: ' + JSON.stringify(registrar));
    container.register(registrar,  { formatName: 'camelCase' });
    this.gears.push(gearName);
  }

}

module.exports = Muchinery;
