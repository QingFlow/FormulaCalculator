"use strict";
exports.__esModule = true;
// var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
var antlr4 = require("antlr4");
var MyFormula_1 = require("./MyFormula");
var FormulaLexer = require("../token_parse/FormulaLexer");
var FormulaParser = require("../token_parse/FormulaParser");
var FormulaError_1 = require("./FormulaError");
// var FormulaLexer = require('../token_parse/FormulaLexer');
// var antlr4 = require('antlr4');
// var FormulaParser = require('../token_parse/FormulaParser');
// var QfErr = require('./FormulaError').FormulaError;
function calculate() {
    var formularString = arguments[0]; // 传入的公式字符串
    var params = arguments[1]; // 传入的其他有用信息，如用户信息等
    var chars = new antlr4.InputStream(formularString);
    var lexer = new FormulaLexer.FormulaLexer(chars);
    var tokens = new antlr4.CommonTokenStream(lexer);
    var parser = new FormulaParser.FormulaParser(tokens);
    var visitor = new MyFormula_1.MyFormulaVisitor(params);
    var result = visitor.visit(parser.formula());
    // 计算出答案超过一个，答案为undefined，答案为object都会报错
    if (result.length !== 1 || result[0] === undefined || typeof result[0] === 'object') {
        var err = new FormulaError_1.FormulaError({
            errCode: 3
        });
        throw err;
    }
    return result[0];
}
exports.calculate = calculate;
// module.exports.calculate = calculate;
