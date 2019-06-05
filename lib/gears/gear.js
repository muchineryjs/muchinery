/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

/**
 * Base (abstract) class to which derive any Muchinery Gear.
 */
class Gear {

  /**
   * Gear base constructor.
   * @param {string} name - the unique Gear name for the system.
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * The name property getter.
   * @returns {string} - the Gear unique name.
   */
  get name() {
    return this._name;
  }

  /**
   * Gear config property setter.
   * @param {Object} - the configuration object to set.
   */
  set config(config) {
    this._config = config;
  }

  /**
   * Gear logger property setter.
   * @param {Object|LoggerInstance} - the logger object to set.
   * @see LoggerInstance
   */
  set logger(logger) {
    this._logger = logger;
  }

  /**
   * Gear logger property getter.
   * @returns {Object|LoggerInstance} - the logger property value.
   */
  get logger() {
    return this._logger;
  }

  /**
   * Starts the Gear bootstrap phase calling the actual start() method.
   * @param {Object} config - the configuration object for the Gear.
   * @param {Object} options - custom options for the Gear.
   */
  async bootstrap(config, options) {
    try {
      this._logger.debug(`${this._name}.bootstrap()`);
      if (config) {
        this._config = config;
        if (config.logger) {
          this._logger = logger;
        } 
      }

      this._options = options;
      this._logger.debug(`options: ${JSON.stringify(this._options)}`);

      await this.start();
    } catch(err) {
      throw err;
    }
  };

  /**
   * Implements the start phase of a Gear. This is intendend to be implemented in the concrete Gear class.
   * @abstract
   */
  start() {
    this._logger.debug(`gear ${this.name} started with config: ${JSON.stringify(this._config)}`);
  }

}

module.exports = Gear;