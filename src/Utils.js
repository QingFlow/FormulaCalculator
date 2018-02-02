var FormulaError = require('./FormulaError').FormulaError;

/**
* 检查值的类型，并抛出错误
* @param {*} value 要检查类型的值
* @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
* @param {*} funcName 函数名称，用于类型检查报错
* @param {*} startIdx 参数开始开始的位置，从0开始
*/
export function checkValueType(type, funcName, startIdx, ...values) {
  values = [].concat(...values);
  values.forEach((value, index) => {
    if(typeof value !== type) {
      let err = new FormulaError({
          errCode: 1,
          funcName: funcName,
          paramIdx: startIdx + index + 1
      });
      throw err;
    }
  })
}

/**
 * 检查参数的个数是否正确
 * @param {*} funcName 方法名称
 * @param {*} count 期待参数个数
 * @param {*} params 参数列表，即arguments参数
 */
export function checkParamCount(funcName, count, params) {
  if (count !== params.length) {
    let err = new FormulaError({
      errCode: 2,
      funcName: funcName,
      expectNum: count,
      actualNum: params.length
    });
    throw err;
  }
}

// 字符串反转
export function reverse(value) {
    return String(value).split("").reverse().join("");
}
