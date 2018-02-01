"use strict";
exports.__esModule = true;
// var FormulaError = require('./FormulaError').FormulaError;
var FormulaError_1 = require("./FormulaError");
/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
*/
function checkValueType(type, funcName) {
    var values = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        values[_i - 2] = arguments[_i];
    }
    values = [].concat.apply([], values);
    values.forEach(function (value, index) {
        if (typeof value !== type) {
            var err = new FormulaError_1.FormulaError({
                errCode: 1,
                funcName: funcName,
                paramIdx: index
            });
            throw err;
        }
    });
}
exports.checkValueType = checkValueType;
