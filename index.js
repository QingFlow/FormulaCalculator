
// module.exports =  Object.assign(
//   {},
//   require('./dist/Calculator')
// );
var calculate = require('./dist/Calculator').calculate;

module.exports = {
  calculate: calculate
}
exports = module.exports;