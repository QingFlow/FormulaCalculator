// Generated from Formula.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete generic visitor for a parse tree produced by FormulaParser.

function FormulaVisitor() {
	antlr4.tree.ParseTreeVisitor.call(this);
	return this;
}

FormulaVisitor.prototype = Object.create(antlr4.tree.ParseTreeVisitor.prototype);
FormulaVisitor.prototype.constructor = FormulaVisitor;

// Visit a parse tree produced by FormulaParser#formula.
FormulaVisitor.prototype.visitFormula = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#parens.
FormulaVisitor.prototype.visitParens = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#plusMinus.
FormulaVisitor.prototype.visitPlusMinus = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#compare.
FormulaVisitor.prototype.visitCompare = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#unaryOperator.
FormulaVisitor.prototype.visitUnaryOperator = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#or.
FormulaVisitor.prototype.visitOr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#double.
FormulaVisitor.prototype.visitDouble = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#list.
FormulaVisitor.prototype.visitList = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#int.
FormulaVisitor.prototype.visitInt = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#mulDiv.
FormulaVisitor.prototype.visitMulDiv = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#str.
FormulaVisitor.prototype.visitStr = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#func.
FormulaVisitor.prototype.visitFunc = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#and.
FormulaVisitor.prototype.visitAnd = function(ctx) {
  return this.visitChildren(ctx);
};


// Visit a parse tree produced by FormulaParser#xor.
FormulaVisitor.prototype.visitXor = function(ctx) {
  return this.visitChildren(ctx);
};



exports.FormulaVisitor = FormulaVisitor;