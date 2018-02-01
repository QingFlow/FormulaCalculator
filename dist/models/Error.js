"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Error = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Error = exports.Error = function Error(data) {
  (0, _classCallCheck3.default)(this, Error);

  this.errCode = data.errCode; // 错误码，1:参数类型错误
  this.funcName = data.funcName; // 出错方法名称
  this.paramIdx = data.paramIdx; // 类型错误参数索引，从0开始
};