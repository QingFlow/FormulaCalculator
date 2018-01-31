"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 公式错误类型
 * @todo 错误类型等待完善，现在只需要抛出错误就可以了
 */
var FormulaError = function FormulaError(data) {
  (0, _classCallCheck3.default)(this, FormulaError);

  this.errCode = data.errCode;
  this.funcName = data.funcName;
};

module.exports.FormulaError = FormulaError;