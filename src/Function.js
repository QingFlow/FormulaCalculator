import { isNullOrUndefined, debug } from 'util';

var checkValueType = require('./Utils').checkValueType;
var checkParamCount = require('./Utils').checkParamCount;
var reverse = require('./Utils').reverse;
var moment = require('moment');
/**
 * 函数的定义
 */
export class Function {
  // 获取一般方法的列表
  getFuncMap() {
      return {
          'IF': this.funcIf,
          'CONCAT': this.funcConcat,
          'LEFT': this.funcLeft,
          'RIGHT': this.funcRight,
          'REPLACE': this.funcReplace,
          'MID': this.funcMid,
          'TEXT': this.funcText,
          'NUM': this.funNum,
          'SUM': this.funcSum,
          'SUMIF': this.funcSumIf,
          'AVERAGE': this.funcAverage,
          'COUNT': this.funcCount,
          'MIN': this.funcMin,
          'MAX': this.funcMax,
          'ROUND': this.funcRound,
          'INT': this.funcInt,
          'MOD': this.funcMod,
          'PRODUCT': this.funcProduct,
          'SUMPRODUCT': this.funcSumProduct,
          'POWER': this.funcPower,
          'YEAR': this.funcYear,
          'MONTH': this.funcMonth,
          'DAY': this.funcDay,
          'HOUR': this.funcHour,
          'MINUTE': this.funcMinite,
          'SECOND': this.funcSecond,
          'DATE': this.funcDate,
          'CURDATE': this.funcCurDate,
          'NOW': this.funcNow,
          'RDID': this.funcRDID,
          'UPPER': this.funcUpper,
          'LOWER': this.funcLower,
          'AND': this.funcAnd,
          'OR': this.funcOr,
          'NOT': this.funcNot,
          'XOR': this.funcXor,
          'ISEMPTY': this.funcIsEmpty,
          'SEARCH': this.funcSearch,
          'LEN': this.funcLen,
          'DAYS': this.funcDays,
          'DATEDELTA': this.funcDateDelta
      }
  }

  // 获取所有需要用户信息来计算的方法
  getFuncMapWithParam() {
      return {
          'GETUSERNAME': this.funcGetUserName,
          'GETUSEREMAIL': this.funcGetUserEmail,
          'JAID': this.funJAaId,
          'JANAME': this.funJaName,
          'JATYPE': this.funJaType,
          'JADEPTID': this.funJaDeptId,
          'JADEPTNAME': this.funJaDeptName,
          'RECNO': this.funcRecno
      }
  }
  // if表达式
  funcIf(test, value1, value2) {
      checkValueType('boolean', 'IF', 0, test);
      checkParamCount('IF', 3, arguments);
      return test ? value1 : value2;
  }
  // 把字符串串起来
  funcConcat(...values) {
      values = [].concat(...values); // flat
      return values.join('');
  }
  // 取左边的n个数
  funcLeft(value, n) {
      checkValueType('number', 'LEFT', 1, n);
      checkParamCount('LEFT', 2, arguments);
      value = String(value);
      return value.substr(0, n);
  }
  // 取右边的n个数
  funcRight(value, n) {
    checkValueType('number', 'RIGHT', 1, n);
    checkParamCount('RIGHT', 2, arguments);
    return reverse(reverse(value).substr(0, n));
  }
  // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）
  funcReplace(value, start, n, newValue) {
      value = String(value);
      newValue = String(newValue);
      checkValueType('number', 'REPLACE', 1, start, n);
      checkParamCount('REPLACE', 4, arguments);
      return value.substring(0, start - 1) + newValue + value.substr(start + n - 1);
  }
  // 取中间的子串，从start开始，取长度为n的子串
  funcMid(value, start, n) {
      checkParamCount('MID', 3, arguments);
      value = String(value);
      return value.substr(start - 1, n);
  }
  // 把时间转化为字符串
  funcText(value, timeFormat) {
      checkParamCount('TEXT', 2, arguments);
      if (timeFormat === 'E') {
          moment.locale('en');
        return moment(value).format('e');
      }
      else if (timeFormat === 'EE') {
        moment.locale('zh-cn');
        return moment(value).format('ddd');
      }
      else if (timeFormat === 'EEE') {
        moment.locale('zh-cn');
        return moment(value).format('dddd');
      }
      else if(timeFormat) {
          var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
          return t.format(timeFormat);
      } else {
          return `"${value}"`;
      }
  }
  // 把其他类型的字段转换成数字类型，可以识别浮点类型
  funNum(value) {
      checkParamCount('NUM', 1, arguments);
      return Number.parseFloat(value);
  }
  // 求和
  funcSum(...values) {
      values = [].concat(...values); // flat
      // 如果没有值的话，返回0
      if (values.length === 0) {
          return 0;
      }
      // 类型检查
      checkValueType('number', 'SUM', 0, values);
      return values.reduce((pre, next) => {
          return Number.parseFloat(pre) + Number.parseFloat(next);
      })
  }
  // 满足条件的情况下再求和
  funcSumIf(base, compare, values) {
      // 如果values为空或者判定条件为空
      if (base.length === 0 || values.length === 0) {
          return 0;
      }
      // 需要求和的值，如果有空字符串，null或者undefined，直接赋值为0
      values.forEach((v, index) => {
          if (isNullOrUndefined(v) || v === "") {
              values.splice(index, 1, 0);
          }
        })
      // 类型检查
      checkValueType('number', 'SUMIF', 2, values);
      // compare传递的是一个数组时，对数组中每一个值求对比结果
      if (compare.constructor.name === 'Array') {
          let result = [];
          compare.forEach(compareVal => {
            let tmpResult = 0;
            base.forEach((baseVal, index) => {
                if (baseVal === compareVal && index < values.length) {
                    tmpResult += values[index];
                }
            })
            result.push(tmpResult);
          })
          return result;
      } else {
        let result = 0;
        base.forEach((baseVal, index) => {
            if (baseVal === compare && index < values.length) {
                result += values[index];
            }
        })
        return result;
      }
  }
  

  // 平均数
  funcAverage(...values) {
      values = [].concat(...values); // flat
      // 如果没有值的话，返回0
      if (values.length === 0) {
          return 0;
      }
      // 类型检查
      checkValueType('number', 'AVERAGE', 0, values);
      var sum = values.reduce((pre, next) => {
          return Number.parseFloat(pre) + Number.parseFloat(next);
      })
      return sum / values.length;
  }
  // 计数
  funcCount(...values) {
      values = [].concat(...values); // flat
      return values.length;
  }
  // 最小值
  funcMin(...values) {
      values = [].concat(...values); // flat
      // 类型检查
      checkValueType('number', 'MIN', 0, values);
      var min = Number.MAX_VALUE;
      for (var v of values) {
          if (min > v) {
              min = v;
          }
      }
      return min;
  }
  // 最大值
  funcMax(...values) {
      values = [].concat(...values); // flat
      // 类型检查
      checkValueType('number', 'MAX', 0, values);
      var max = Number.MIN_VALUE;
      for (var v of values) {
          if (max < v) {
              max = v;
          }
      }
      return max;
  }
  // 四舍五入
  funcRound(value, n) {
      checkParamCount('ROUND', 2, arguments);
      checkValueType('number', 'ROUND', 0, value, n);
      let iterValue = 1;
      for(let i=0; i<n; i++) {
          iterValue = 10*iterValue;
      }
      return Math.round(value * iterValue) / (iterValue);
  }
  // 取整数
  funcInt(value) {
      checkValueType('number', 'INT', 0, value);
      checkParamCount('INT', 1, arguments);
      return Math.floor(value);
  }
  // 取余（mod操作）
  funcMod(value, divisor) {
      checkValueType('number', 'MOD', 0, value, divisor);
      checkParamCount('MOD', 2, arguments);
      return Number.parseInt(value) % Number.parseInt(divisor);
  }
  // 连乘（product是office里面的称呼）
  funcProduct(...values) {
      values = [].concat(...values); // flat
      // 类型检查
      checkValueType('number', 'PRODUCT', 0, values);
      var result = 1;
      for (var v of values) {
          result *= Number.parseFloat(v);
      }
      return result;
  }
  // 对应相乘后相加
  funcSumProduct(value1, value2) {
      var result = 0;
      // 获取两个数组的最小长度
      var length = value1.length < value2.length?value1.length:value2.length;
      for (let index = 0; index < length; index++) {
          result += value1[index] * value2[index];
      }
      return result;
  }
  // 对number求power次方
  funcPower(number, power) {
    checkValueType('number', 'POWER', 0, number, power);
    return Math.pow(number, power);
  }
  // 拿到年份
  funcYear(value) {
      checkParamCount('YEAR', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.year();
  }
  // 拿到月份：注意，用moment拿月份时，是从0~11来计算的
  funcMonth(value) {
      checkParamCount('MONTH', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.month() + 1;
  }
  // 拿到月份中的day
  funcDay(value) {
      checkParamCount('DAY', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.date();
  }
  // 时
  funcHour(value) {
      checkParamCount('HOUR', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.hour();
  }
  // 分
  funcMinite(value) {
      checkParamCount('MINITE', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.minute();
  }
  // 秒
  funcSecond(value) {
      checkParamCount('SECOND', 1, arguments);
      var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
      return t.second();
  }
  // 组装出日期，时分秒如果没有传递，替换成00
  funcDate(Y, M, D, H, m, s) {
      var t = moment();
      t.year(Number.parseInt(Y));
      t.month(Number.parseInt(M) - 1);
      t.date(Number.parseInt(D));
      t.hour(Number.parseInt(H?H:0));
      t.minute(Number.parseInt(m?m:0));
      t.second(Number.parseInt(s?s:0));
      return t.format('YYYY-MM-DD HH:mm:ss');
  }
  // 当前的日期
  funcCurDate() {
      var t = moment();
      return t.format('YYYY-MM-DD');
  }
  // 当前时间
  funcNow() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
  }
  // 生成随机码
  funcRDID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // 把字符串中英文字符转换成大写
  funcUpper(value) {
      checkParamCount('UPPER', 1, arguments);
      return value.toString().toUpperCase();
  }

  // 把字符串中英文字符转换成小写
  funcLower(value) {
      checkParamCount('LOWER', 1, arguments);
      return value.toString().toLowerCase();
  }
  
  // 与操作
  funcAnd(value1, value2) {
      // 类型检查
      checkValueType('boolean', 'AND', 0, value1, value2);
      checkParamCount('AND', 2, arguments);
      return value1 && value2;
  }

  // 或操作
  funcOr(value1, value2) {
      // 类型检查
      checkValueType('boolean', 'OR', 0, value1, value2);
      checkParamCount('OR', 2, arguments);
      return value1 || value2;
  }
  // 非操作
  funcNot(value) {
      // 类型检查
      checkValueType('boolean', 'NOT', 0, value);
      checkParamCount('NOT', 1, arguments);
      return !value;
  }
  // 异或操作
  funcXor(value1, value2) {
      // 类型检查
      checkValueType('boolean', 'XOR', 0, value1, value2);
      checkParamCount('XOR', 2, arguments);
      return value1 ^ value2 ? true : false;
  }

  // 检查传入的值是否为空
  funcIsEmpty(value) {
      if (isNullOrUndefined(value) || value === "" || (value.constructor.name === 'Array' && value === [])) {
          return true;
      }
      return false;
  }

  // 查找字符串,在targetText中查找searchText所在位置，返回出现位置索引，没找到返回0,beginPos为开始查找的位置
  funcSearch(searchText, targetText, beginPos) {
      if (!beginPos) {
          beginPos = 1;
      }
      checkValueType('number', 'SEARCH', 2, beginPos);
      checkParamCount('SEARCH', 3, arguments);
      return String(targetText).indexOf(String(searchText), beginPos-1) + 1;
  }

  // 获取字符串的长度
  funcLen(value) {
      checkParamCount('LEN', 1, arguments);
      return String(value).length;
  }

  // 计算end和start之间相差的天数
  funcDays(end, start) {
      checkParamCount('DAYS', 2, arguments);
      return moment.duration(moment(end).unix() - moment(start).unix()).asDays() * 1000;
  }

  // 计算出date增加或减少days天的日期（days可以为正数/负数）
  funcDateDelta(date, days) {
      checkValueType('number', 'DATEDELTA', 1, days);
      checkParamCount('DATEDELTA', 2, arguments);
      return moment(date).add(days, 'days').format("YYYY-MM-DD HH:mm:ss");
  }

  // 获取用户名，根据工作区备注>昵称>邮箱的优先级返回用户的用户名
  funcGetUserName(params) {
      if (params['alias']) { return params['alias']; }
      if (params['nickName']) { return params['nickName']; }
      if (params['email']) { return params['email']; }
      return "";
  }

  // 返回用户的邮箱
  funcGetUserEmail(params) {
      return params['email'];
  }

  // 获取ja学工号
  funJAaId(params) {
      return params['jaInfo']['sid']?params['jaInfo']['sid']:"";
  }

  // 获取ja姓名
  funJaName(params) {
    if (params['nickName']) { return params['nickName']; }
    if (params['alias']) { return params['alias']; }
    if (params['email']) { return params['email']; }
    return "";
  }

  // 获取ja用户类型
  funJaType(params) {
      let userType = params['jaInfo']['userType'];
      switch(userType) {
          case "student":
              return "学生";
          case "schoolFellow":
              return "校友";
          case "faculty":
              return "教职工";
          case "postphd":
              return "博士后";
          case "team":
              return "集体账号";
          default:
              return "其他";
      }
  }

  // 获取ja学院ID
  funJaDeptId(params) {
      return params['jaInfo']['organizeId'];
  }

  // 获取ja学院名称
  funJaDeptName(params) {
      return params['jaInfo']['organize'];
  }

  // 获取表单打开次数
  funcRecno(params) {
      return params['openCount'];
  }
}
