const awilix = require('awilix');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY
});

exports = module.exports = container;

exports.asClass = awilix.asClass;
exports.asFunction = awilix.asFunction;
exports.asValue = awilix.asValue;
exports.Lifetime = awilix.Lifetime;
