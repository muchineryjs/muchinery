/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

const { LoggerFactory } = require('../logger');

/**
 * Create the GearRegistry object.
 * @constructs GearRegistry
 * @function createGearsRegistry
 */
function createGearsRegistry() {
  return {
    _gears: {},
    _gearsOptions: {},
    _logger: LoggerFactory.getLogger('GearsRegistry'),

    /**
     * Register a Gear into the registry.
     * @param {Object} gear - the gear instance whose class extends the Gear class.
     * @param {Object} options - the gear instance options object.
     */
    register(gear, options) {
      this._logger.info(`registering ${gear.name} gear`);
      this._gears[gear.name] = gear;
      options && (this._gearsOptions[gear.name] = options);
    },

    /**
     * Internal registry gears property getter.
     * @returns {Object} - the gears object.
     */
    get gears() {
      return this._gears;
    },

    /**
     * Returns a registered Gear instance.
     * @param {string} gearName - the gear name to return instance for.
     * @returns {Object} - the gear instance.
     */
    gear(gearName) {
      return this._gears[gearName];
    },

    /**
     * Internal gear options registry property getter.
     * @returns {Object} - the gears options object.
     */
    get gearsOptions() {
      return this._gerasOptions;
    },

    /**
     * Returns options for registered Gear instance.
     * @param {string} gearName - the gear name to return options for.
     * @returns {Object} - the gear optoins.
     */
    gearOptions(gearName) {
      return this._gearsOptions[gearName];
    }
  }
}

/** the actual GearRegistry instance */
const GearsRegistry = createGearsRegistry();

module.exports = GearsRegistry;