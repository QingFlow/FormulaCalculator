"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * 公式错误类型
 * @todo 错误类型等待完善，现在只需要抛出错误就可以了
 */
var FormulaError = function FormulaError(data) {
  _classCallCheck(this, FormulaError);

  this.errCode = data.errCode;
};

module.exports.FormulaError = FormulaError;