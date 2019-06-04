module.exports = class Gear {

  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set muchinery(muchinery) {
    console.log('setting Muchinery into ' + this._name);
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
      this._logger.debug('++++++++++++++++++++++++++++');
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
      this._logger.debug('++++++++++++++++++++++++++++');
    } catch(err) {
      throw err;
    }
  };

  /**
   * @override
   */
  start() {
    this._logger.debug(`gear ${this.name} started with config: ${JSON.stringify(this._config)}`);
  }

}
