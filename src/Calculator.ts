
// var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
import * as antlr4 from 'antlr4';
import { MyFormulaVisitor } from './MyFormula';
import * as FormulaLexer from '../token_parse/FormulaLexer';
import * as FormulaParser from '../token_parse/FormulaParser';
import { FormulaError } from './FormulaError';
// var FormulaLexer = require('../token_parse/FormulaLexer');
// var antlr4 = require('antlr4');
// var FormulaParser = require('../token_parse/FormulaParser');
// var QfErr = require('./FormulaError').FormulaError;

export function calculate() {
  let formularString = arguments[0];  // 传入的公式字符串
  let params = arguments[1];  // 传入的其他有用信息，如用户信息等
  let chars = new antlr4.InputStream(formularString);
  let lexer = new FormulaLexer.FormulaLexer(chars);
  let tokens  = new antlr4.CommonTokenStream(lexer);
  let parser = new FormulaParser.FormulaParser(tokens);
  let visitor = new MyFormulaVisitor(params);
  let result = visitor.visit(parser.formula());
  // 计算出答案超过一个，答案为undefined，答案为object都会报错
  if(result.length !== 1 || result[0]===undefined || typeof result[0] === 'object') {
    let err = new FormulaError({
      errCode: 3
    });
    throw err;
  }
  return result[0];
}

// module.exports.calculate = calculate;