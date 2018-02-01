"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.checkValueType = checkValueType;
exports.reverse = reverse;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormulaError = require('./FormulaError').FormulaError;

/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
*/
function checkValueType(type, funcName) {
  for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    values[_key - 2] = arguments[_key];
  }

  var _ref;

  values = (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(values));
  values.forEach(function (value, index) {
    if ((typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) !== type) {
      var err = new FormulaError({
        errCode: 1,
        funcName: funcName,
        paramIdx: index
      });
      throw err;
    }
  });
}

// 字符串反转
function reverse(value) {
  return String(value).split("").reverse().join("");
}