
// var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;

// var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
// var moment = require('moment');
// var FormulaError = require('./FormulaError').FormulaError;
// var Function = require('./Function').Function;
// var checkValueType = require('./Utils').checkValueType;
import * as FormulaVisitor from '../token_parse/FormulaVisitor';
import * as FormulaParser from '../token_parse/FormulaParser';
import * as moment from 'moment';
import { FormulaError } from './FormulaError';
import { Function } from './Function';
import { checkValueType } from './Utils';

export class MyFormulaVisitor extends FormulaVisitor{

    params;
    functionMap;
    userInfoFunctionMap;
    visit;
    constructor(params: any) {
        super();
        this.visit = super.visit;
        this.params = params;  // 公式计算所需的其他参数
        this.functionMap = new Function().getFuncMap();  // 获取所有一般方法
        this.userInfoFunctionMap = new Function().getUserInfoFuncMap();  // 获取所有需要用户信息来计算的方法
    }

    // 一元操作符
    visitUnaryOperator(ctx) {
        var value = super.visit(ctx.expr());
        checkValueType('number', 'MINUS', value);
        return - parseFloat(value);
    }
    
    // 解析加减法
    visitPlusMinus(ctx) {
        var value1 = super.visit(ctx.expr(0));
        var value2 = super.visit(ctx.expr(1));
        // 类型检查
        checkValueType('number', 'MINUS', value1, value2);
        switch (ctx.op.type){
            case FormulaParser.PLUS:return value1 + value2;
            case FormulaParser.MINUS:return value1 - value2;
        }
    };
    
    //解析整数
    visitInt(ctx) {
        return parseInt(ctx.INT().getText());
    }
    //解析浮点数
    visitDouble(ctx) {
        return parseFloat(ctx.DOUBLE().getText());
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
        return super.visit(ctx.expr());
    }
    // 解析一些比较符号
    visitCompare(ctx) {
        var value1 = super.visit(ctx.expr(0));
        var value2 = super.visit(ctx.expr(1));
        // 类型检查
        switch (ctx.op.type) {
            case FormulaParser.LT:
            case FormulaParser.LE:
            case FormulaParser.GT:
            case FormulaParser.GE:
                checkValueType('number', 'COMPARE', value1, value2);
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
    // 解析数组
    visitList(ctx) {
        var result = [];
        for (var val of ctx.expr()) {
            result.push(super.visit(val));
        }
        return result;
    }
    // 解析乘除法[todo: 因为都转化成了浮点数，所以会有问题]
    visitMulDiv(ctx) {
        var value1 = parseFloat(super.visit(ctx.expr(0)));
        var value2 = parseFloat(super.visit(ctx.expr(1)));
        switch(ctx.op.type) {
            case FormulaParser.MULTIPLY: 
                // 类型解析
                checkValueType('number', 'MULTIPLE', value1, value2);
                return value1 * value2;
            case FormulaParser.DIVIDE:
                // 类型解析
                checkValueType('number', 'DIVIDE', value1, value2);
                return value1 / value2;
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
                paramList.push(super.visit(val));
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

// module.exports.MyFormulaVisitor = MyFormulaVisitor;
