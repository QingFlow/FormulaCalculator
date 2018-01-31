'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

exports.checkValueType = checkValueType;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormulaError = require('./FormulaError').FormulaError;

/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
*/
function checkValueType(value, type, funcName) {
    if ((typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) !== type) {
        var err = new FormulaError({
            errCode: 1,
            funcName: funcName
        });
        throw err;
    }
}