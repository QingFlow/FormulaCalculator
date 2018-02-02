"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.checkValueType = checkValueType;
exports.checkParamCount = checkParamCount;
exports.reverse = reverse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormulaError = require('./FormulaError').FormulaError;

/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
* @param {*} startIdx 参数开始开始的位置，从0开始
*/
function checkValueType(type, funcName, startIdx) {
  for (var _len = arguments.length, values = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    values[_key - 3] = arguments[_key];
  }

  var _ref;

  values = (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(values));
  values.forEach(function (value, index) {
    if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) !== type) {
      var err = new FormulaError({
        errCode: 1,
        funcName: funcName,
        paramIdx: startIdx + index + 1
      });
      throw err;
    }
  });
}

/**
 * 检查参数的个数是否正确
 * @param {*} funcName 方法名称
 * @param {*} count 期待参数个数
 * @param {*} params 参数列表，即arguments参数
 */
function checkParamCount(funcName, count, params) {
  if (count !== params.length) {
    var err = new FormulaError({
      errCode: 2,
      funcName: funcName,
      expectNum: count,
      actualNum: params.length
    });
    throw err;
  }
}

// 字符串反转
function reverse(value) {
  return String(value).split("").reverse().join("");
}