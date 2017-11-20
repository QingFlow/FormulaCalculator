'use strict';

var MyFormulaVisitor = require('./MyFormula').MyFormulaVisitor;
var FormulaLexer = require('../token_parse/FormulaLexer');
var antlr4 = require('antlr4');
var FormulaParser = require('../token_parse/FormulaParser');
var assert = require('assert');

// class QfCalc {
// function calculate(input) {
//     try {
//     var chars = new antlr4.InputStream(input);
//     var lexer = new FormulaLexer.FormulaLexer(chars);
//     var tokens  = new antlr4.CommonTokenStream(lexer);
//     var parser = new FormulaParser.FormulaParser(tokens);
//     var visitor = new MyFormulaVisitor();
//     var result = visitor.visit(parser.formula());

//     return result[0]
//     }
//     catch(e) {
//         console.log(e);
//     }
// }

// function test(input) {
// var queIdMap = {
//     100: '123',
//     101: 'abcde',
//     102: ['123', '456', '789'],
//     103: ['abc', 'def', 'ghi'],
//     104: ['123', 'abc'],
//     105: '2017-01-02 03:04:00',
//     106: '2017-01-02'
// }
// console.log("测试: " + input);
// var result = calculate(input, queIdMap);
//     console.log("结果是: " + input);
//     return input;
// }
// }

// function 

// var r;
// var u;

// r = test('11+1');
// u = calculate('SUM(1,1,2)');
// assert.equal(u, 4);
// r = test('#queId_100 * 2')
// assert(r, '246');
// r = test('(20 + 30) / 5')
// assert.equal(r, '10')
// r = test('1 > 2 or 3 < 4')
// assert.equal(r, true)
// r = test('IF(3 - 2 == 1 and 5 * 3 <= 15, "abc", "def")')
// assert.equal(r, 'abc')
// r = test('CONCAT([1,3,4],"32")')
// assert.equal(r, '13432')
// r = test('CONCAT(#queId_101,"32")')
// assert.equal(r, 'abcde32')
// r = test('CONCAT(#queId_103)')
// assert.equal(r, 'abcdefghi')
// r = test('LEFT("abcde", 3)')
// assert.equal(r, 'abc')
// r = test('REPLACE("abcde", 2, 2, "123")')
// assert.equal(r, 'a123de')
// r = test('MID("abcde", 1, 3)')
// assert.equal(r, 'abc')
// r = test('TEXT("2016-01-01", "YYYYMMDD")')
// assert.equal(r, '20160101')
// // r = test('TEXT("12.34567", "#.##")')
// // assert.equal(r, '12.35')
// r = test('AVERAGE(1.2, 2.4, 3.6)')
// assert.equal(r, '2.4')
// r = test('COUNT(1.2, 2.4, 3.6)')
// assert.equal(r, '3')
// r = test('ROUND(1.23456, 3)')
// assert.equal(r, '1.235')
// r = test('INT(1.63456)')
// assert.equal(r, '1')
// r = test('MOD(20, 7)')
// assert.equal(r, '6')
// r = test('PRODUCT([20, 7], 3)')
// assert.equal(r, '420')
// r = test('SUM([20, 7], 3)')
// assert.equal(r, '30')
// r = test('SUM(#queId_102)')
// assert.equal(r, '1368')
// // r = test('SUM(#queId_105, 2, 3)')
// // assert.equal(r, '5')
// r = test('SUMPRODUCT([20, 7], 3)')
// assert.equal(r, '143')
// r = test('YEAR("2017-01-02 03:04:00")')
// assert.equal(r, '2017')
// r = test('YEAR("2017-01-02")')
// assert.equal(r, '2017')
// r = test('MONTH("2017-01-02 03:04:00")')
// assert.equal(r, '1')
// r = test('MONTH("2017-01-02")')
// assert.equal(r, '1')
// r = test('DAY("2017-01-02 03:04:00")')
// assert.equal(r, '2')
// r = test('DAY("2017-01-02")')
// assert.equal(r, '2')
// r = test('HOUR("2017-01-02 03:04:00")')
// assert.equal(r, '3')
// r = test('HOUR("2017-01-02")')
// assert.equal(r, '0')
// r = test('MINUTE("2017-01-02 03:04:00")')
// assert.equal(r, '4')
// r = test('MINUTE(#queId_105)')
// assert.equal(r, '4')
// r = test('MINUTE("2017-01-02")')
// assert.equal(r, '0')
// r = test('MINUTE(#queId_106)')
// assert.equal(r, '0')
// r = test('DATE(2017,1,2,3,4,0)')
// assert.equal(r, '2017-01-02 03:04:00')
// r = test('CURDATE()')
// r = test('NOW()')
// r = test('RDID()')
// module.exports = calculate;