import { isNullOrUndefined } from 'util';

var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;
var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
var moment = require('moment');
var FormulaError = require('./FormulaError').FormulaError;
var Function = require('./Function').Function;
var checkValueType = require('./Utils').checkValueType;
var replaceNullParam = require('./Utils').replaceNullParam;

class MyFormulaVisitor extends FormulaVisitor{

    constructor() {
        super();
        this.params = arguments[0];  // 公式计算所需的其他参数
        this.functionMap = new Function().getFuncMap();  // 获取所有一般方法
        this.userInfoFunctionMap = new Function().getFuncMapWithParam();  // 获取所有需要用户信息来计算的方法
    }

    visitNull(ctx) {
        return null;
    }

    // 一元操作符
    visitUnaryOperator(ctx) {
        var value = this.visit(ctx.expr());
        checkValueType('number', 'MINUS', 0, value);
        return - Number.parseFloat(value);
    }
    
    // 解析加减法
    visitPlusMinus(ctx) {
        var value1 = this.visit(ctx.expr(0));
        var value2 = this.visit(ctx.expr(1));
        // var values = [ value1, value2 ];
        if (isNullOrUndefined(value1) || value1.constructor.name !== 'Array') {
            value1 = [ value1 ];
        }
        var values = value1.concat(value2);
        values = replaceNullParam(values);
        // 类型检查
        checkValueType('number', 'MINUS', 0, values);
        switch (ctx.op.type){
            case FormulaParser.PLUS:
                return values.reduce((pre, next) => {
                    return Number.parseFloat(pre).add(Number.parseFloat(next));
                })
            case FormulaParser.MINUS:
                return values.reduce((pre, next) => {
                    return Number.parseFloat(pre).sub(Number.parseFloat(next));
                })
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
        var value1 = replaceNullParam([].concat(this.visit(ctx.expr(0))));
        var value2 = replaceNullParam([].concat(this.visit(ctx.expr(1))));
        // 类型检查
        switch (ctx.op.type) {
            case FormulaParser.LT:
            case FormulaParser.LE:
            case FormulaParser.GT:
            case FormulaParser.GE:
                checkValueType('number', 'COMPARE', 0, value1, value2);
        }
        let result = true;
        value1.forEach((val1, index) => {
            let val2 = value2[index];
            if (isNullOrUndefined(val2)) { val2 = 0; }
            switch (ctx.op.type) {
                case FormulaParser.EQ: 
                    if (val1 !== val2) {result = false};
                    break;
                case FormulaParser.NEQ: 
                    if (val1 === val2) {result = false};
                    break;
                case FormulaParser.LT: 
                    if (val1 >= val2) {result = false};
                    break;
                case FormulaParser.LE: 
                    if (val1 > val2) {result = false};
                    break;
                case FormulaParser.GT: 
                    if (val1 <= val2) {result = false;};
                    break;
                case FormulaParser.GE: 
                    if (val1 < val2) {result = false};
                    break;
            }
        })
        return result;
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
        var values = [ value1, value2 ];
        values = replaceNullParam(values);
        switch(ctx.op.type) {
            case FormulaParser.MULTIPLY: 
                // 类型解析
                checkValueType('number', 'MULTIPLE', 0, values);
                var result = 1;
                for (var v of values) {
                    result = result.mul(Number.parseFloat(v));
                }
                return result;
            case FormulaParser.DIVIDE:
                // 类型解析
                checkValueType('number', 'DIVIDE', 0, value2);
                var result;
                for( var i = 0; i< values.length; i++) {
                    if (i === 0) {
                        result = values[i];
                    } else if (values[i] === 0) {
                        result = 0;
                    } else {
                        result = result.div(Number.parseFloat(values[i]));
                    }
                }
                return result;
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
        // 如果方法为用户信息相关方法，则把参数信息传递过去
        else if(funcName in this.userInfoFunctionMap) {
            return this.userInfoFunctionMap[funcName](this.params);
        }
        else {
            // todo: 抛出异常
        }
    }
    // 解析错误输入
    visitError(ctx) {
        let err = new FormulaError({
            errCode: 4
        });
        throw err;
    }
}

module.exports.MyFormulaVisitor = MyFormulaVisitor;
