"use strict";
// var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
// var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
// var moment = require('moment');
// var FormulaError = require('./FormulaError').FormulaError;
// var Function = require('./Function').Function;
// var checkValueType = require('./Utils').checkValueType;
var FormulaVisitor = require("../token_parse/FormulaVisitor");
var FormulaParser = require("../token_parse/FormulaParser");
var FormulaError_1 = require("./FormulaError");
var Function_1 = require("./Function");
var Utils_1 = require("./Utils");
var MyFormulaVisitor = /** @class */ (function (_super) {
    __extends(MyFormulaVisitor, _super);
    function MyFormulaVisitor(params) {
        var _this = _super.call(this) || this;
        _this.visit = _super.prototype.visit;
        _this.params = params; // 公式计算所需的其他参数
        _this.functionMap = new Function_1.Function().getFuncMap(); // 获取所有一般方法
        _this.userInfoFunctionMap = new Function_1.Function().getUserInfoFuncMap(); // 获取所有需要用户信息来计算的方法
        return _this;
    }
    // 一元操作符
    MyFormulaVisitor.prototype.visitUnaryOperator = function (ctx) {
        var value = _super.prototype.visit.call(this, ctx.expr());
        Utils_1.checkValueType('number', 'MINUS', value);
        return -parseFloat(value);
    };
    // 解析加减法
    MyFormulaVisitor.prototype.visitPlusMinus = function (ctx) {
        var value1 = _super.prototype.visit.call(this, ctx.expr(0));
        var value2 = _super.prototype.visit.call(this, ctx.expr(1));
        // 类型检查
        Utils_1.checkValueType('number', 'MINUS', value1, value2);
        switch (ctx.op.type) {
            case FormulaParser.PLUS: return value1 + value2;
            case FormulaParser.MINUS: return value1 - value2;
        }
    };
    ;
    //解析整数
    MyFormulaVisitor.prototype.visitInt = function (ctx) {
        return parseInt(ctx.INT().getText());
    };
    //解析浮点数
    MyFormulaVisitor.prototype.visitDouble = function (ctx) {
        return parseFloat(ctx.DOUBLE().getText());
    };
    // 解析布尔值
    MyFormulaVisitor.prototype.visitBool = function (ctx) {
        switch (ctx.op.type) {
            case FormulaParser.TRUE: return true;
            case FormulaParser.FALSE: return false;
        }
    };
    // 解析括号
    MyFormulaVisitor.prototype.visitParens = function (ctx) {
        return _super.prototype.visit.call(this, ctx.expr());
    };
    // 解析一些比较符号
    MyFormulaVisitor.prototype.visitCompare = function (ctx) {
        var value1 = _super.prototype.visit.call(this, ctx.expr(0));
        var value2 = _super.prototype.visit.call(this, ctx.expr(1));
        // 类型检查
        switch (ctx.op.type) {
            case FormulaParser.LT:
            case FormulaParser.LE:
            case FormulaParser.GT:
            case FormulaParser.GE:
                Utils_1.checkValueType('number', 'COMPARE', value1, value2);
        }
        switch (ctx.op.type) {
            case FormulaParser.EQ: return value1 === value2;
            case FormulaParser.NEQ: return value1 !== value2;
            case FormulaParser.LT: return value1 < value2;
            case FormulaParser.LE: return value1 <= value2;
            case FormulaParser.GT: return value1 > value2;
            case FormulaParser.GE: return value1 >= value2;
        }
    };
    // 解析数组
    MyFormulaVisitor.prototype.visitList = function (ctx) {
        var result = [];
        for (var _i = 0, _a = ctx.expr(); _i < _a.length; _i++) {
            var val = _a[_i];
            result.push(_super.prototype.visit.call(this, val));
        }
        return result;
    };
    // 解析乘除法[todo: 因为都转化成了浮点数，所以会有问题]
    MyFormulaVisitor.prototype.visitMulDiv = function (ctx) {
        var value1 = parseFloat(_super.prototype.visit.call(this, ctx.expr(0)));
        var value2 = parseFloat(_super.prototype.visit.call(this, ctx.expr(1)));
        switch (ctx.op.type) {
            case FormulaParser.MULTIPLY:
                // 类型解析
                Utils_1.checkValueType('number', 'MULTIPLE', value1, value2);
                return value1 * value2;
            case FormulaParser.DIVIDE:
                // 类型解析
                Utils_1.checkValueType('number', 'DIVIDE', value1, value2);
                return value1 / value2;
            default: return 0; // todo: 报错
        }
    };
    // 解析字符串
    MyFormulaVisitor.prototype.visitStr = function (ctx) {
        var value = ctx.String().getText();
        return value.substring(1, value.length - 1);
    };
    // 解析函数
    MyFormulaVisitor.prototype.visitFunc = function (ctx) {
        var funcName = ctx.ID().getText();
        // 检查函数名是否存在于 预定义的函数中
        if (funcName in this.functionMap) {
            var paramList = [];
            // 先拿到参数
            for (var _i = 0, _a = ctx.expr(); _i < _a.length; _i++) {
                var val = _a[_i];
                paramList.push(_super.prototype.visit.call(this, val));
            }
            return (_b = this.functionMap)[funcName].apply(_b, paramList);
        }
        else if (funcName in this.userInfoFunctionMap) {
            return this.userInfoFunctionMap[funcName](this.params);
        }
        else {
            // todo: 抛出异常
        }
        var _b;
    };
    // 解析错误输入
    MyFormulaVisitor.prototype.visitError = function (ctx) {
        var err = new FormulaError_1.FormulaError({
            errCode: 4
        });
        throw err;
    };
    return MyFormulaVisitor;
}(FormulaVisitor));
exports.MyFormulaVisitor = MyFormulaVisitor;
// module.exports.MyFormulaVisitor = MyFormulaVisitor;
