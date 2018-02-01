var FormulaError = require('./FormulaError').FormulaError;

/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
*/
export function checkValueType(type, funcName, ...values) {
  values = [].concat(...values);
  values.forEach((value, index) => {
    if(typeof value !== type) {
      let err = new FormulaError({
          errCode: 1,
          funcName: funcName,
          paramIdx: index
      });
      throw err;
    }
  })
}

// 字符串反转
export function reverse(value) {
    return String(value).split("").reverse().join("");
}