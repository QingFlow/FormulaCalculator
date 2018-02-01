"use strict";
exports.__esModule = true;
// var checkValueType = require('./Utils').checkValueType;
var Utils_1 = require("./Utils");
var moment = require("moment");
/**
 * 函数的定义
 */
var Function = /** @class */ (function () {
    function Function() {
    }
    // 获取一般方法的列表
    Function.prototype.getFuncMap = function () {
        return {
            'IF': this.funcIf,
            'CONCAT': this.funcConcat,
            'LEFT': this.funcLeft,
            'REPLACE': this.funcReplace,
            'MID': this.funcMid,
            'TEXT': this.funcText,
            'NUM': this.funNum,
            'SUM': this.funcSum,
            'AVERAGE': this.funcAverage,
            'COUNT': this.funcCount,
            'MIN': this.funcMin,
            'MAX': this.funcMax,
            'ROUND': this.funcRound,
            'INT': this.funcInt,
            'MOD': this.funcMod,
            'PRODUCT': this.funcProduct,
            'SUMPRODUCT': this.funcSumProduct,
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
            'XOR': this.funcXor
        };
    };
    // 获取所有需要用户信息来计算的方法
    Function.prototype.getUserInfoFuncMap = function () {
        return {
            'GETUSERNAME': this.funcGetUserName,
            'GETUSEREMAIL': this.funcGetUserEmail,
            'JAID': this.funJAaId,
            'JANAME': this.funJaName,
            'JATYPE': this.funJaType,
            'JADEPTID': this.funJaDeptId,
            'JADEPTNAME': this.funJaDeptName
        };
    };
    // if表达式
    Function.prototype.funcIf = function (test, value1, value2) {
        Utils_1.checkValueType('boolean', 'IF', test);
        return test ? value1 : value2;
    };
    // 把字符串串起来
    Function.prototype.funcConcat = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        return values.join('');
    };
    // 取左边的n个数
    Function.prototype.funcLeft = function (value, n) {
        value = String(value);
        return value.substr(0, n);
    };
    // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）
    Function.prototype.funcReplace = function (value, start, n, newValue) {
        value = String(value);
        newValue = String(newValue);
        Utils_1.checkValueType('number', 'REPLACE', start, n);
        return value.substring(0, start - 1) + newValue + value.substr(start + n - 1);
    };
    // 取中间的子串，从start开始，取长度为n的子串
    Function.prototype.funcMid = function (value, start, n) {
        value = String(value);
        return value.substr(start - 1, n);
    };
    // 把时间转化为字符串
    Function.prototype.funcText = function (value, timeFormat) {
        if (timeFormat) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.format(timeFormat);
        }
        else {
            return "\"" + value + "\"";
        }
    };
    // 把其他类型的字段转换成数字类型，可以识别浮点类型
    Function.prototype.funNum = function (value) {
        return parseFloat(value);
    };
    // 求和
    Function.prototype.funcSum = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        // 如果没有值的话，返回0
        if (values.length === 0) {
            return 0;
        }
        // 类型检查
        Utils_1.checkValueType('number', 'SUM', values);
        return values.reduce(function (pre, next) {
            return parseFloat(pre) + parseFloat(next);
        });
    };
    // 平均数
    Function.prototype.funcAverage = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        // 如果没有值的话，返回0
        if (values.length === 0) {
            return 0;
        }
        // 类型检查
        Utils_1.checkValueType('number', 'AVERAGE', values);
        var sum = values.reduce(function (pre, next) {
            return parseFloat(pre) + parseFloat(next);
        });
        return sum / values.length;
    };
    // 计数
    Function.prototype.funcCount = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        return values.length;
    };
    // 最小值
    Function.prototype.funcMin = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        // 类型检查
        Utils_1.checkValueType('number', 'MIN', values);
        var min = Number.MAX_VALUE;
        for (var _a = 0, values_1 = values; _a < values_1.length; _a++) {
            var v = values_1[_a];
            if (min > v) {
                min = v;
            }
        }
        return min;
    };
    // 最大值
    Function.prototype.funcMax = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        // 类型检查
        Utils_1.checkValueType('number', 'MAX', values);
        var max = Number.MIN_VALUE;
        for (var _a = 0, values_2 = values; _a < values_2.length; _a++) {
            var v = values_2[_a];
            if (max < v) {
                max = v;
            }
        }
        return max;
    };
    // 四舍五入
    Function.prototype.funcRound = function (value, n) {
        Utils_1.checkValueType('number', 'ROUND', value, n);
        var iterValue = 1;
        for (var i = 0; i < n; i++) {
            iterValue = 10 * iterValue;
        }
        return Math.round(value * iterValue) / (iterValue);
    };
    // 取整数
    Function.prototype.funcInt = function (value) {
        Utils_1.checkValueType('number', 'INT', value);
        return Math.floor(value);
    };
    // 取余（mod操作）
    Function.prototype.funcMod = function (value, divisor) {
        Utils_1.checkValueType('number', 'MOD', value, divisor);
        return parseInt(value) % parseInt(divisor);
    };
    // 连乘（product是office里面的称呼）
    Function.prototype.funcProduct = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values = [].concat.apply([], values); // flat
        // 类型检查
        Utils_1.checkValueType('number', 'PRODUCT', values);
        var result = 1;
        for (var _a = 0, values_3 = values; _a < values_3.length; _a++) {
            var v = values_3[_a];
            result *= parseFloat(v);
        }
        return result;
    };
    // 连乘后相加
    Function.prototype.funcSumProduct = function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var result = 0;
        for (var _a = 0, values_4 = values; _a < values_4.length; _a++) {
            var v = values_4[_a];
            // 数组
            if (typeof v === 'object') {
                var r2 = 1;
                for (var _b = 0, v_1 = v; _b < v_1.length; _b++) {
                    var v2 = v_1[_b];
                    r2 *= parseFloat(v2);
                }
                result += r2;
            }
            else {
                result += parseFloat(v);
            }
        }
        return result;
    };
    // 拿到年份
    Function.prototype.funcYear = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.year();
    };
    // 拿到月份：注意，用moment拿月份时，是从0~11来计算的
    Function.prototype.funcMonth = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.month() + 1;
    };
    // 拿到月份中的day
    Function.prototype.funcDay = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.date();
    };
    // 时
    Function.prototype.funcHour = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.hour();
    };
    // 分
    Function.prototype.funcMinite = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.minute();
    };
    // 秒
    Function.prototype.funcSecond = function (value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.second();
    };
    // 组装出日期，时分秒如果没有传递，替换成00
    Function.prototype.funcDate = function (Y, M, D, H, m, s) {
        var t = moment();
        t.year(parseInt(Y));
        t.month(parseInt(M) - 1);
        t.date(parseInt(D));
        t.hour(parseInt(H ? H : 0));
        t.minute(parseInt(m ? m : 0));
        t.second(parseInt(s ? s : 0));
        return t.format('YYYY-MM-DD HH:mm:ss');
    };
    // 当前的日期
    Function.prototype.funcCurDate = function () {
        var t = moment();
        return t.format('YYYY-MM-DD');
    };
    // 当前时间
    Function.prototype.funcNow = function () {
        return moment().format('YYYY-MM-DD HH:mm:ss');
    };
    // 生成随机码
    Function.prototype.funcRDID = function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    // 把字符串中英文字符转换成大写
    Function.prototype.funcUpper = function (value) {
        return value.toString().toUpperCase();
    };
    // 把字符串中英文字符转换成小写
    Function.prototype.funcLower = function (value) {
        return value.toString().toLowerCase();
    };
    // 与操作
    Function.prototype.funcAnd = function (value1, value2) {
        // 类型检查
        Utils_1.checkValueType('boolean', 'AND', value1, value2);
        return value1 && value2;
    };
    // 或操作
    Function.prototype.funcOr = function (value1, value2) {
        // 类型检查
        Utils_1.checkValueType('boolean', 'OR', value1, value2);
        return value1 || value2;
    };
    // 非操作
    Function.prototype.funcNot = function (value) {
        // 类型检查
        Utils_1.checkValueType('boolean', 'NOT', value);
        return !value;
    };
    // 异或操作
    Function.prototype.funcXor = function (value1, value2) {
        // 类型检查
        Utils_1.checkValueType('boolean', 'XOR', value1, value2);
        return value1 ^ value2 ? true : false;
    };
    // 获取用户名，根据工作区备注>昵称>邮箱的优先级返回用户的用户名
    Function.prototype.funcGetUserName = function (params) {
        if (params['alias']) {
            return params['alias'];
        }
        if (params['nickName']) {
            return params['nickName'];
        }
        if (params['email']) {
            return params['email'];
        }
        return "";
    };
    // 返回用户的邮箱
    Function.prototype.funcGetUserEmail = function (params) {
        return params['email'];
    };
    // 获取ja学工号
    Function.prototype.funJAaId = function (params) {
        return params['jaInfo']['sid'] ? params['jaInfo']['sid'] : "";
    };
    // 获取ja姓名
    Function.prototype.funJaName = function (params) {
        return params['jaInfo']['name'] ? params['jaInfo']['name'] : "";
    };
    // 获取ja用户类型
    Function.prototype.funJaType = function (params) {
        var userType = params['jaInfo']['userType'];
        switch (userType) {
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
    };
    // 获取ja学院ID
    Function.prototype.funJaDeptId = function (params) {
        return params['jaInfo']['organizeId'];
    };
    // 获取ja学院名称
    Function.prototype.funJaDeptName = function (params) {
        return params['jaInfo']['organize'];
    };
    return Function;
}());
exports.Function = Function;
