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
const gearsRegistry = () => {
  const _gears = {};
  const _gearsOptions = {};
  const _logger = LoggerFactory.getLogger('gearsRegistry');

  return {
    /**
     * Register a Gear into the registry.
     * @param {Object} gear - the gear instance whose class extends the Gear class.
     * @param {Object} options - the gear instance options object.
     */
    register(gear, options) {
      _logger.info(`registering ${gear.name} gear`);
      _gears[gear.name] = gear;
      options && (_gearsOptions[gear.name] = options);
    },

    /**
     * Internal registry gears property getter.
     * @returns {Object} - the gears object.
     */
    get gears() {
      return _gears;
    },

    /**
     * Returns a registered Gear instance.
     * @param {string} gearName - the gear name to return instance for.
     * @returns {Object} - the gear instance.
     */
    instance(gearName) {
      return _gears[gearName];
    },

    /**
     * Internal gear options registry property getter.
     * @returns {Object} - the gears options object.
     */
    get gearsOptions() {
      return _gerasOptions;
    },

    /**
     * Returns options for registered Gear instance.
     * @param {string} gearName - the gear name to return options for.
     * @returns {Object} - the gear optoins.
     */
    options(gearName) {
      return _gearsOptions[gearName];
    },

    /**
     * Returns full gear information as property.
     * @param {string} gearName - the gear name to return info for.
     */
    gear(gearName) {
      return {
        instance: this.instance(gearName),
        options: this.options(gearName)
      }
    }
  }
}

/** the actual GearRegistry instance */
const GearsRegistry = gearsRegistry();

module.exports = GearsRegistry;