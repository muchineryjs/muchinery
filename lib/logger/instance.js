/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

 /**
  * A logger instance returned by the Logger Factory and configured for the category.
  */
class LoggerInstance {

  /**
   * Create a LoggerInstance. This method is intented to be used from the Logger Factory
   * getLogger() method to instantiate the logger instance for the category.
   * 
   * @param {Object} instance - the logger instance initialized by the Logger Factory.
   * @param {string} k - the logger category.
   */
  constructor(instance, k) {
    this.instance = instance;
    this.k = k || 'muchinery';
  }

  /**
   * Logs out an "info" message.
   * 
   * @param {string} message - the message to log.
   */
  info(message) {
    this.instance.info(message, { klass: this.k });
  }

  /**
   * Logs out a "debug" message.
   * 
   * @param {string} message - the message to log.
   */
  debug(message) {
    this.instance.debug(message, { klass: this.k });
  }

  /**
   * Logs out a "warn" message.
   * 
   * @param {string} message - the message to log.
   */
  warn(message) {
    this.instance.warn(message, { klass: this.k });
  }

  /**
   * Logs out a "error" message.
   * 
   * @param {string} message - the message to log.
   */
  error(message) {
    this.instance.error(message, { klass: this.k });
  }

}

module.exports = LoggerInstance;