/*!
 * Copyright (c) 2019 Luca Stasio
 * Copyright (c) 2019 IT Resources s.r.l.
 *
 * Use of this source code is governed by an MIT license that can be
 * found in the LICENSE file at https://github.com/muchineryjs/muchinery/blob/master/LICENSE
 */

/**
 * A logger instance returned by the Logger Factory and configured for the category.
 * Create a LoggerInstance. This method is intented to be used from the Logger Factory
 * getLogger() method to instantiate the logger instance for the category.
 * @constructs LoggerInstance
 * @param {Object} instance - the logger instance initialized by the Logger Factory.
 * @param {string} k - the logger category.
 */
function LoggerInstance(instance, k) {
  this.instance = instance;
  this.k = k;
}

/**
 * Logs out an "info" message.
 * @param {string} message - the message to log.
 */
LoggerInstance.prototype.info = function(message) {
  this.instance.info(message, { klass: this.k });
}

/**
 * Logs out a "debug" message.
 * @param {string} message - the message to log.
 */
LoggerInstance.prototype.debug = function(message) {
  this.instance.debug(message, { klass: this.k });
}

/**
 * Logs out a "warn" message.
 * @param {string} message - the message to log.
 */
LoggerInstance.prototype.warn = function(message) {
  this.instance.warn(message, { klass: this.k });
}

/**
 * Logs out a "error" message.
 * @param {string} message - the message to log.
 */
LoggerInstance.prototype.error = function(message)  {
  this.instance.error(message, { klass: this.k });
}

module.exports = LoggerInstance;
