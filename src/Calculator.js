'use strict';

var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
var FormulaLexer = require('./generatedCode/FormulaLexer');
var antlr4 = require('antlr4');
var FormulaParser = require('./generatedCode/FormulaParser');

function calculate(input) {
  var chars = new antlr4.InputStream(input);
  var lexer = new FormulaLexer.FormulaLexer(chars);
  var tokens  = new antlr4.CommonTokenStream(lexer);
  var parser = new FormulaParser.FormulaParser(tokens);
  var visitor = new MyFormulaVisitor();
  var result = visitor.visit(parser.formula());
  return result[0];
}

module.exports.calculate = calculate;