module.exports = class Gear {

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

  bootstrap(config) {
    if (config) {
      this._config = config;
      if (config.logger) {
        this._logger = logger;
      } 
    }
    this.start();
  };

  /**
   * @override
   */
  start() {
    this._logger.debug(`gear ${this.name} started with config: ${JSON.stringify(this._config)}`);
  }

}
