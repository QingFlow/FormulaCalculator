
var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;
var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
var moment = require('moment');
var QfErr = require('./FormulaError').FormulaError;
require('babel-polyfill');

class MyFormulaVisitor extends FormulaVisitor{
    constructor() {
        super();
        this.functionMap = new Function().getFuncMap();
    }

    // 一元操作符
    visitUnaryOperator(ctx) {
        var value = this.visit(ctx.expr());
        switch(ctx.op.type) {
            case FormulaParser.NOT: 
                checkValueType(value, 'boolean');
                return ! value;
            case FormulaParser.MINUS: 
                checkValueType(value, 'number');
                return - Number.parseFloat(value);
        }
    }
    
    // 解析加减法
    visitPlusMinus(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        // 类型检查
        checkValueType(value1, 'number');
        checkValueType(value2, 'number');
        switch (ctx.op.type){
            case FormulaParser.PLUS:return value1 + value2;
            case FormulaParser.MINUS:return value1 - value2;
        }
    };
    
    //解析整数
    visitInt(ctx) {
        return Number.parseInt(ctx.INT().getText());
    }
    //解析浮点数
    visitDouble(ctx) {
        return Number.parseFloat(ctx.DOUBLE().getText());
    }
    // 解析布尔值
    visitBool(ctx) {
        switch (ctx.op.type){
            case FormulaParser.TRUE: return true;
            case FormulaParser.FALSE: return false;
        }
    }
    // 解析括号
    visitParens(ctx) {
        return this.visit(ctx.expr());
    }
    // 解析一些比较符号
    visitCompare(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        // 类型检查
        switch (ctx.op.type) {
            case FormulaParser.LT:
            case FormulaParser.LE:
            case FormulaParser.GT:
            case FormulaParser.GE:
                checkValueType(value1, 'number');
                checkValueType(value2, 'number');
        }
        switch (ctx.op.type) {
            case FormulaParser.EQ: return value1 === value2;
            case FormulaParser.NEQ: return value1 !== value2;
            case FormulaParser.LT: return value1 < value2;
            case FormulaParser.LE: return value1 <= value2;
            case FormulaParser.GT: return value1 > value2;
            case FormulaParser.GE: return value1 >= value2;
        }
    }
    // 解析or操作
    visitOr(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        // 类型检查
        checkValueType(value1, 'boolean');
        checkValueType(value2, 'boolean');
        return value1 || value2;
    }
    // 解析and操作
    visitAnd(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        // 类型检查
        checkValueType(value1, 'boolean');
        checkValueType(value2, 'boolean');
        return value1 && value2;
    }
    // 解析抑或
    visitXor(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        return value1 ^ value2;
    }
    // 解析数组
    visitList(ctx) {
        var result = [];
        for (var val of ctx.expr()) {
            result.push(this.visit(val));
        }
        return result;
    }
    // 解析乘除法[todo: 因为都转化成了浮点数，所以会有问题]
    visitMulDiv(ctx) {
        var value1 = Number.parseFloat(this.visit(ctx.expr(0)));
        var value2 = Number.parseFloat(this.visit(ctx.expr(1)));
        // 类型解析
        checkValueType(value1, 'number');
        checkValueType(value2, 'number');
        switch(ctx.op.type) {
            case FormulaParser.MULTIPLY: return value1 * value2;
            case FormulaParser.DIVIDE: return value1 / value2;
            default: return 0; // todo: 报错
        }
    }
    // 解析字符串
    visitStr(ctx) {
        var value = ctx.String().getText();
        return value.substring(1, value.length - 1);
    }
    // 解析函数
    visitFunc(ctx) {
        var funcName = ctx.ID().getText();
        // 检查函数名是否存在于 预定义的函数中
        if (funcName in this.functionMap) {
            var paramList = []
            // 先拿到参数
            for (var val of ctx.expr()) {
                paramList.push(this.visit(val));
            }
            return this.functionMap[funcName](...paramList);
        }
        else {
            // todo: 抛出异常
        }
    }
    // 解析错误输入
    visitError(ctx) {
        let err = new QfErr({
            errCode: 4
        });
        throw err;
    }
}


/**
 * 函数的定义
 */
class Function {
    getFuncMap() {
        return {
            'IF': this.funcIf,
            'CONCAT': this.funcConcat,
            'LEFT': this.funcLeft,
            'REPLACE': this.funcReplace,
            'MID': this.funcMid,
            'TEXT': this.funcText,
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
            'RDID': this.funcRDID
        }
    }
    // if表达式
    funcIf(test, value1, value2) {
        checkValueType(test, 'boolean');
        return test ? value1 : value2;
    }
    // 把字符串串起来
    funcConcat(...values) {
        values = [].concat(...values); // flat
        return values.join('');
    }
    // 取左边的n个数
    funcLeft(value, n) {
        value = String(value);
        return value.substr(0, n);
    }
    // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）
    funcReplace(value, start, n, newValue) {
        value = String(value);
        newValue = String(newValue);
        return value.substring(0, start - 1) + newValue + value.substr(start + n - 1);
    }
    // 取中间的子串，从start开始，取长度为n的子串
    funcMid(value, start, n) {
        value = String(value);
        return value.substr(start - 1, n);
    }
    // 把时间转化为字符串
    funcText(value, timeFormat) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.format(timeFormat);
    }
    // 求和
    funcSum(...values) {
        values = [].concat(...values); // flat
        // 类型检查
        values.every(val => {
            checkValueType(val, 'number');
            return true;
        })
        return values.reduce((pre, next) => {
            return Number.parseFloat(pre) + Number.parseFloat(next);
        })
    }
    // 平均数
    funcAverage(...values) {
        values = [].concat(...values); // flat
        // 类型检查
        values.every(val => {
            checkValueType(val, 'number');
            return true;
        })
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
        values.every(val => {
            checkValueType(val, 'number');
            return true;
        })
        var min = Number.MIN_VALUE;
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
        values.every(val => {
            checkValueType(val, 'number');
            return true;
        })
        var max = Number.MAX_VALUE;
        for (var v of values) {
            if (max < v) {
                max = v;
            }
        }
        return max;
    }
    // 四舍五入
    funcRound(value, n) {
        checkValueType(value, 'number');
        checkValueType(n, 'number');
        let iterValue = 1;
        for(let i=0; i<n; i++) {
            iterValue = 10*iterValue;
        }
        return Math.round(value * iterValue) / (iterValue);
    }
    // 取整数
    funcInt(value) {
        checkValueType(value, 'number');
        return Number.parseInt(value);
    }
    // 取余（mod操作）
    funcMod(value, divisor) {
        checkValueType(value, 'number');
        checkValueType(divisor, 'number');
        return Number.parseInt(value) % Number.parseInt(divisor);
    }
    // 连乘（product是office里面的称呼）
    funcProduct(...values) {
        values = [].concat(...values); // flat
        // 类型检查
        values.every(val => {
            checkValueType(val, 'number');
            return true;
        })
        var result = 1;
        for (var v of values) {
            result *= Number.parseFloat(v);
        }
        return result;
    }
    // 连乘后相加
    funcSumProduct(...values) {
        var result = 0;
        for (var v of values) {
            // 数组
            if (typeof v === 'object') {
                var r2 = 1;
                for (var v2 of v) {
                    r2 *= Number.parseFloat(v2);
                }
                result += r2;
            }
            // 普通数字
            else {
                result += Number.parseFloat(v);
            }
        }
        return result;
    }
    // 拿到年份
    funcYear(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.year();
    }
    // 拿到月份：注意，用moment拿月份时，是从0~11来计算的
    funcMonth(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.month() + 1;
    }
    // 拿到月份中的day
    funcDay(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.date();
    }
    // 时
    funcHour(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.hour();
    }
    // 分
    funcMinite(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.minute();
    }
    // 秒
    funcSecond(value) {
        var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
        return t.second();
    }
    // 组装出日期
    funcDate(Y, M, D, H, m, s) {
        var t = moment();
        t.year(Number.parseInt(Y));
        t.month(Number.parseInt(M) - 1);
        t.date(Number.parseInt(D));
        t.hour(Number.parseInt(H));
        t.minute(Number.parseInt(m));
        t.second(Number.parseInt(s));
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
        return uuid();
    }
}

/**
 * guid简单的生成器（参见https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript）
 */
function uuid() {
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

/**
 * 检查值的类型，并抛出错误
 * @param {*} value 要检查类型的值
 * @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
 */
function checkValueType(value, type) {
    if(typeof value !== type) {
        let err = new QfErr({
            errCode: 2
        });
        throw err;
    }
}

module.exports.MyFormulaVisitor = MyFormulaVisitor;
