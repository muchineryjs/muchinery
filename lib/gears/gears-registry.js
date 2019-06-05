const { Logger } = require('../logger');

function createGearsRegistry() {
  return {
    _gears: {},
    _gearsOptions: {},
    _logger: Logger.getLogger('GearsRegistry'),

    register(gear, options) {
      this._logger.info(`registering ${gear.name} gear`);
      this._gears[gear.name] = gear;
      options && (this._gearsOptions[gear.name] = options);
    },
    get gears() {
      return this._gears;
    },
    gear(gearName) {
      return this._gears[gearName];
    },
    get gearsOptions() {
      return this._gerasOptions;
    },
    gearOptions(gearName) {
      return this._gearsOptions[gearName];
    }
  }
}

const GearsRegistry = createGearsRegistry();

module.exports = GearsRegistry;