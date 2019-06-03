require('reflect-metadata');
const Muchinery = require('./muchinery');

function muchinery(options) {
  return new Muchinery(options);
}

module.exports = {
  muchinery,
  container: require('./container'),
  Gear: require('./gear')
};
