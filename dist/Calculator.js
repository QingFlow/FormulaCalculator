'use strict';

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
var FormulaLexer = require('../token_parse/FormulaLexer');
var antlr4 = require('antlr4');
var FormulaParser = require('../token_parse/FormulaParser');
var QfErr = require('./FormulaError').FormulaError;

function calculate() {
  var formularString = arguments[0]; // 传入的公式字符串
  var params = arguments[1]; // 传入的其他有用信息，如用户信息等
  var chars = new antlr4.InputStream(formularString);
  var lexer = new FormulaLexer.FormulaLexer(chars);
  var tokens = new antlr4.CommonTokenStream(lexer);
  var parser = new FormulaParser.FormulaParser(tokens);
  var visitor = new MyFormulaVisitor(params);
  var result = visitor.visit(parser.formula());
  // 计算出答案超过一个，答案为undefined，答案为object都会报错
  if (result.length !== 1 || result[0] === undefined || (0, _typeof3.default)(result[0]) === 'object') {
    var err = new QfErr({
      errCode: 3
    });
    throw err;
  }
  return result[0];
}

module.exports.calculate = calculate;