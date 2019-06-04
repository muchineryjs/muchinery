module.exports = class LoggerInstance {
  constructor(instance, klass) {
    this.instance = instance;
    this.klass = klass || 'muchinery';
  }

  info(message) {
    this.instance.info(message, { klass: this.klass });
  }

  debug(message) {
    this.instance.debug(message, { klass: this.klass });
  }

  warn(message) {
    this.instance.warn(message, { klass: this.klass });
  }

  error(message) {
    this.instance.error(message, { klass: this.klass });
  }

  verbose(message) {
    this.instance.verbose(message, { klass: this.klass });
  }
}