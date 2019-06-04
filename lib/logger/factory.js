const fs = require('fs');
const moment = require('moment');
const path = require('path');
const { LoggerConfiguration, LoggerFactory, LogLevel  } = require('slf4ts-api');
const winston = require('winston');
require('winston-daily-rotate-file');
const config = require('config');
const LoggerInstance = require('./instance');

const DEFAULT_CONFIGURATION = {
  level: 'info',
  json: false,
  path: './logs',
  filename: 'muchinery-service-log',
  timestampFormat: 'DD/MM/YYYY HH:mm:ss.SSSS',
  console: true,
};


module.exports = class Logger {

  static setup() {
    const configuration = config.get('muchinery.log') || DEFAULT_CONFIGURATION;
    const transports = [];

    const fullPath = path.join(process.cwd(), configuration.file.path);
    !fs.existsSync(fullPath) && fs.mkdirSync(fullPath);
    const fullname = path.join(fullPath, configuration.file.name);

    transports.push(
      new (winston.transports.DailyRotateFile)({
        datePattern: configuration.file.dateFormat,
        filename: `${fullname}-%DATE%.log`,
        zippedArchive: configuration.file.zippedArchive,
        maxSize: configuration.file.maxSize,
        maxFiles: configuration.file.maxFiles,
        format: winston.format.combine(
          winston.format.printf(
            i => `[${moment().format(configuration.timestampFormat)}] [${i.level}] [${i.klass}]: ${i.message}`,
          ),
        ),
        json: configuration.json,
        level: configuration.level,
      }),
    );

    if (configuration.console) {
      const consoleTransport = new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.printf(
            i => `[${moment().format(configuration.timestampFormat)}] [${i.level}] [${i.klass}]: ${i.message}`,
          ),
        ),
        level: configuration.level,
      });
      transports.push(consoleTransport);
    }

    const loggingConfig = {
      transports,
      json: configuration.json,
    };

    LoggerConfiguration.setConfig(loggingConfig);
    LoggerConfiguration.setLogLevel(LogLevel.DEBUG);
  }

  static getLogger(klass) {
    return new LoggerInstance(LoggerFactory.getLogger(), klass);
  }

}
