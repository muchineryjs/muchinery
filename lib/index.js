require('reflect-metadata');
Promise = require('bluebird');
const Muchinery = require('./muchinery');
const { Logger, LoggerInstance } = require('./logger');

Logger.setup();

module.exports = {
  muchinery: function(options) {
    options = options || {};    
    return new Muchinery(options);
  },
  Gear: require('./gear'),
  Logger,
  LoggerInstance
};
