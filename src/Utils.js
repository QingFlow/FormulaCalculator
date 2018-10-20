import { isNullOrUndefined } from 'util';

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

/**
 * 去除数组中为null或者undefined的值
 * @param {*} values 需要剔除无用数值的数组
 */
export function removeNullParam(values) {
  let resultValues = [];
  for(let i = 0; i < values.length; i++) {
    if (!isNullOrUndefined(values[i])) {
      resultValues.push(values[i]);
    }
  }
  return resultValues;
}

/**
 * 数组中null或者undefined的值替换为0
 * @param {*} values 
 */
export function replaceNullParam(values) {
  let resultValues = [];
  for(let i = 0; i < values.length; i++) {
    let tempVal = values[i];
    if (isNullOrUndefined(tempVal) || isNaN(tempVal)) {
      tempVal = 0;
    }
    resultValues.push(tempVal);
  }
  return resultValues;
}

/**
 * 获取字符串中第一个数字，小数也可以获取
 */
export function getFirstNum(val) {
  if (isNullOrUndefined(val)) { return null; }
  val = val.toString();
  let matches = val.match(/(-)*[0-9]\d*(\.\d+)?/g);
  if (isNullOrUndefined(matches) || matches.length < 1) {
    return null;
  }
  else {
    return Number.parseFloat(matches[0]);
  }
}

// 加减乘除精度运算
Number.prototype.add = function(arg) {
  let r1 = 0;
  let r2 = 0;
  let m = 0;
  if (this.toString().indexOf('.') !== -1) {
    try {r1 = this.toString().split('.')[1].length} catch(e) {}
  }
  if (arg.toString().indexOf('.') !== -1) {
    try {r2 = arg.toString().split('.')[1].length} catch(e) {}
  }
  m = Math.pow(10, Math.max(r1, r2));
  return (this.mul(m) + arg.mul(m)).div(m);
}

Number.prototype.sub = function(arg) {
  return this.add(-arg);
}

Number.prototype.mul = function(arg) {
  let m = 0;
  let s1 = this.toString();
  let s2 = arg.toString();
  if (s1.indexOf('.') !== -1) {
    try {m += s1.split('.')[1].length} catch(e) {}
  }
  if (s2.indexOf('.') !== -1) {
    try {m += s2.split('.')[1].length} catch(e) {}
  }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}

Number.prototype.div = function(arg) {
  let r1 = 0;
  let r2 = 0;
  if (this.toString().indexOf('.') !== -1) {
    try {r1 = this.toString().split('.')[1].length} catch(e) {}
  }
  if (arg.toString().indexOf('.') !== -1) {
    try {r2 = arg.toString().split('.')[1].length} catch(e) {}
  }
  return (Number(this.toString().replace('.', '')) / Number(arg.toString().replace('.', ''))) * Math.pow(10, r2 - r1);
}

Number.prototype.decimalCnt = function() {
  if (this.toString().indexOf('.') === -1) { return 0; }
  return this.toString().split('.')[1].length;
}