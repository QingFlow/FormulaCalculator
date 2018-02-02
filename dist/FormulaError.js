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

  this.errCode = data.errCode; // 错误码，1:参数类型错误
  this.funcName = data.funcName; // 出错方法名称
  this.paramIdx = data.paramIdx; // 类型错误参数索引，从0开始
  this.expectNum = data.expectNum; // 正确情况下参数个数
  this.actualNum = data.actualNum; // 实际参数个数
};

module.exports.FormulaError = FormulaError;