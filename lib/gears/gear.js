
/**
 * Base (abstract) class to which derive any Muchinery Gear.
 */
class Gear {

  /**
   * Gear base constructor.
   * 
   * @param {string} name - the unique Gear name for the system.
   */
  constructor(name) {
    this._name = name;
  }

  /**
   * The name property getter.
   * 
   * @returns {string} - the Gear unique name.
   */
  get name() {
    return this._name;
  }

  /**
   * Sets the muchinery instance into the Gear. Normally used to access gears.
   * @deprecated since version 0.1.0. Use the GearsRegistry instead.
   * @see GearsRegistry
   */
  set muchinery(muchinery) {
    this._muchinery = muchinery;
  }

  set config(config) {
    this._config = config;
  }

  set logger(logger) {
    this._logger = logger;
  }

  get logger() {
    return this._logger;
  }

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
   * @abstract
   */
  start() {
    this._logger.debug(`gear ${this.name} started with config: ${JSON.stringify(this._config)}`);
  }

}

module.exports = Gear;