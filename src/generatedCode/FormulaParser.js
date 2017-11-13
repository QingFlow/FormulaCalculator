// Generated from Formula.g4 by ANTLR 4.7
// jshint ignore: start
var antlr4 = require('antlr4/index');
var FormulaVisitor = require('./FormulaVisitor').FormulaVisitor;

var grammarFileName = "Formula.g4";

var serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964",
    "\u0003!G\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003\u0018\n\u0003\f\u0003",
    "\u000e\u0003\u001b\u000b\u0003\u0005\u0003\u001d\n\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003$\n\u0003",
    "\f\u0003\u000e\u0003\'\u000b\u0003\u0005\u0003)\n\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0005\u0003.\n\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0007\u0003B\n\u0003",
    "\f\u0003\u000e\u0003E\u000b\u0003\u0003\u0003\u0002\u0003\u0004\u0004",
    "\u0002\u0004\u0002\u0006\u0004\u0002\u0007\u0007\u0016\u0016\u0003\u0002",
    "\b\t\u0003\u0002\u0006\u0007\u0003\u0002\f\u0011\u0002U\u0002\u0006",
    "\u0003\u0002\u0002\u0002\u0004-\u0003\u0002\u0002\u0002\u0006\u0007",
    "\u0005\u0004\u0003\u0002\u0007\u0003\u0003\u0002\u0002\u0002\b\t\b\u0003",
    "\u0001\u0002\t.\u0007\u001a\u0002\u0002\n.\u0007\u001b\u0002\u0002\u000b",
    ".\u0007\u001d\u0002\u0002\f\r\u0007\u0003\u0002\u0002\r.\u0007\u001a",
    "\u0002\u0002\u000e\u000f\u0007\n\u0002\u0002\u000f\u0010\u0005\u0004",
    "\u0003\u0002\u0010\u0011\u0007\u000b\u0002\u0002\u0011.\u0003\u0002",
    "\u0002\u0002\u0012\u0013\u0007\u0019\u0002\u0002\u0013\u001c\u0007\n",
    "\u0002\u0002\u0014\u0019\u0005\u0004\u0003\u0002\u0015\u0016\u0007\u0018",
    "\u0002\u0002\u0016\u0018\u0005\u0004\u0003\u0002\u0017\u0015\u0003\u0002",
    "\u0002\u0002\u0018\u001b\u0003\u0002\u0002\u0002\u0019\u0017\u0003\u0002",
    "\u0002\u0002\u0019\u001a\u0003\u0002\u0002\u0002\u001a\u001d\u0003\u0002",
    "\u0002\u0002\u001b\u0019\u0003\u0002\u0002\u0002\u001c\u0014\u0003\u0002",
    "\u0002\u0002\u001c\u001d\u0003\u0002\u0002\u0002\u001d\u001e\u0003\u0002",
    "\u0002\u0002\u001e.\u0007\u000b\u0002\u0002\u001f(\u0007\u0004\u0002",
    "\u0002 %\u0005\u0004\u0003\u0002!\"\u0007\u0018\u0002\u0002\"$\u0005",
    "\u0004\u0003\u0002#!\u0003\u0002\u0002\u0002$\'\u0003\u0002\u0002\u0002",
    "%#\u0003\u0002\u0002\u0002%&\u0003\u0002\u0002\u0002&)\u0003\u0002\u0002",
    "\u0002\'%\u0003\u0002\u0002\u0002( \u0003\u0002\u0002\u0002()\u0003",
    "\u0002\u0002\u0002)*\u0003\u0002\u0002\u0002*.\u0007\u0005\u0002\u0002",
    "+,\t\u0002\u0002\u0002,.\u0005\u0004\u0003\t-\b\u0003\u0002\u0002\u0002",
    "-\n\u0003\u0002\u0002\u0002-\u000b\u0003\u0002\u0002\u0002-\f\u0003",
    "\u0002\u0002\u0002-\u000e\u0003\u0002\u0002\u0002-\u0012\u0003\u0002",
    "\u0002\u0002-\u001f\u0003\u0002\u0002\u0002-+\u0003\u0002\u0002\u0002",
    ".C\u0003\u0002\u0002\u0002/0\f\b\u0002\u000201\t\u0003\u0002\u00021",
    "B\u0005\u0004\u0003\t23\f\u0007\u0002\u000234\t\u0004\u0002\u00024B",
    "\u0005\u0004\u0003\b56\f\u0006\u0002\u000267\t\u0005\u0002\u00027B\u0005",
    "\u0004\u0003\u000789\f\u0005\u0002\u00029:\u0007\u0017\u0002\u0002:",
    "B\u0005\u0004\u0003\u0006;<\f\u0004\u0002\u0002<=\u0007\u0012\u0002",
    "\u0002=B\u0005\u0004\u0003\u0005>?\f\u0003\u0002\u0002?@\u0007\u0013",
    "\u0002\u0002@B\u0005\u0004\u0003\u0004A/\u0003\u0002\u0002\u0002A2\u0003",
    "\u0002\u0002\u0002A5\u0003\u0002\u0002\u0002A8\u0003\u0002\u0002\u0002",
    "A;\u0003\u0002\u0002\u0002A>\u0003\u0002\u0002\u0002BE\u0003\u0002\u0002",
    "\u0002CA\u0003\u0002\u0002\u0002CD\u0003\u0002\u0002\u0002D\u0005\u0003",
    "\u0002\u0002\u0002EC\u0003\u0002\u0002\u0002\t\u0019\u001c%(-AC"].join("");


var atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

var decisionsToDFA = atn.decisionToState.map( function(ds, index) { return new antlr4.dfa.DFA(ds, index); });

var sharedContextCache = new antlr4.PredictionContextCache();

var literalNames = [ null, "'#queId_'", "'['", "']'", "'+'", "'-'", "'*'", 
                     "'/'", "'('", "')'", "'=='", "'!='", "'<'", "'<='", 
                     "'>'", "'>='", null, null, null, null, null, null, 
                     "','" ];

var symbolicNames = [ null, null, null, null, "PLUS", "MINUS", "MULTIPLY", 
                      "DIVIDE", "LPAREN", "RPAREN", "EQ", "NEQ", "LT", "LE", 
                      "GT", "GE", "AND", "OR", "FALSE", "TRUE", "NOT", "XOR", 
                      "COMMA", "ID", "INT", "DOUBLE", "WS", "String", "StringCharacter", 
                      "EscapeSequence", "UnicodeEscape", "HexDigit" ];

var ruleNames =  [ "formula", "expr" ];

function FormulaParser (input) {
	antlr4.Parser.call(this, input);
    this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
    this.ruleNames = ruleNames;
    this.literalNames = literalNames;
    this.symbolicNames = symbolicNames;
    return this;
}

FormulaParser.prototype = Object.create(antlr4.Parser.prototype);
FormulaParser.prototype.constructor = FormulaParser;

Object.defineProperty(FormulaParser.prototype, "atn", {
	get : function() {
		return atn;
	}
});

FormulaParser.EOF = antlr4.Token.EOF;
FormulaParser.T__0 = 1;
FormulaParser.T__1 = 2;
FormulaParser.T__2 = 3;
FormulaParser.PLUS = 4;
FormulaParser.MINUS = 5;
FormulaParser.MULTIPLY = 6;
FormulaParser.DIVIDE = 7;
FormulaParser.LPAREN = 8;
FormulaParser.RPAREN = 9;
FormulaParser.EQ = 10;
FormulaParser.NEQ = 11;
FormulaParser.LT = 12;
FormulaParser.LE = 13;
FormulaParser.GT = 14;
FormulaParser.GE = 15;
FormulaParser.AND = 16;
FormulaParser.OR = 17;
FormulaParser.FALSE = 18;
FormulaParser.TRUE = 19;
FormulaParser.NOT = 20;
FormulaParser.XOR = 21;
FormulaParser.COMMA = 22;
FormulaParser.ID = 23;
FormulaParser.INT = 24;
FormulaParser.DOUBLE = 25;
FormulaParser.WS = 26;
FormulaParser.String = 27;
FormulaParser.StringCharacter = 28;
FormulaParser.EscapeSequence = 29;
FormulaParser.UnicodeEscape = 30;
FormulaParser.HexDigit = 31;

FormulaParser.RULE_formula = 0;
FormulaParser.RULE_expr = 1;

function FormulaContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FormulaParser.RULE_formula;
    return this;
}

FormulaContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
FormulaContext.prototype.constructor = FormulaContext;

FormulaContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

FormulaContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitFormula(this);
    } else {
        return visitor.visitChildren(this);
    }
};




FormulaParser.FormulaContext = FormulaContext;

FormulaParser.prototype.formula = function() {

    var localctx = new FormulaContext(this, this._ctx, this.state);
    this.enterRule(localctx, 0, FormulaParser.RULE_formula);
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 4;
        this.expr(0);
    } catch (re) {
    	if(re instanceof antlr4.error.RecognitionException) {
	        localctx.exception = re;
	        this._errHandler.reportError(this, re);
	        this._errHandler.recover(this, re);
	    } else {
	    	throw re;
	    }
    } finally {
        this.exitRule();
    }
    return localctx;
};

function ExprContext(parser, parent, invokingState) {
	if(parent===undefined) {
	    parent = null;
	}
	if(invokingState===undefined || invokingState===null) {
		invokingState = -1;
	}
	antlr4.ParserRuleContext.call(this, parent, invokingState);
    this.parser = parser;
    this.ruleIndex = FormulaParser.RULE_expr;
    return this;
}

ExprContext.prototype = Object.create(antlr4.ParserRuleContext.prototype);
ExprContext.prototype.constructor = ExprContext;


 
ExprContext.prototype.copyFrom = function(ctx) {
    antlr4.ParserRuleContext.prototype.copyFrom.call(this, ctx);
};

function ParensContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ParensContext.prototype = Object.create(ExprContext.prototype);
ParensContext.prototype.constructor = ParensContext;

FormulaParser.ParensContext = ParensContext;

ParensContext.prototype.LPAREN = function() {
    return this.getToken(FormulaParser.LPAREN, 0);
};

ParensContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

ParensContext.prototype.RPAREN = function() {
    return this.getToken(FormulaParser.RPAREN, 0);
};
ParensContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitParens(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function PlusMinusContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

PlusMinusContext.prototype = Object.create(ExprContext.prototype);
PlusMinusContext.prototype.constructor = PlusMinusContext;

FormulaParser.PlusMinusContext = PlusMinusContext;

PlusMinusContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

PlusMinusContext.prototype.PLUS = function() {
    return this.getToken(FormulaParser.PLUS, 0);
};

PlusMinusContext.prototype.MINUS = function() {
    return this.getToken(FormulaParser.MINUS, 0);
};
PlusMinusContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitPlusMinus(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function CompareContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

CompareContext.prototype = Object.create(ExprContext.prototype);
CompareContext.prototype.constructor = CompareContext;

FormulaParser.CompareContext = CompareContext;

CompareContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

CompareContext.prototype.EQ = function() {
    return this.getToken(FormulaParser.EQ, 0);
};

CompareContext.prototype.NEQ = function() {
    return this.getToken(FormulaParser.NEQ, 0);
};

CompareContext.prototype.LT = function() {
    return this.getToken(FormulaParser.LT, 0);
};

CompareContext.prototype.LE = function() {
    return this.getToken(FormulaParser.LE, 0);
};

CompareContext.prototype.GT = function() {
    return this.getToken(FormulaParser.GT, 0);
};

CompareContext.prototype.GE = function() {
    return this.getToken(FormulaParser.GE, 0);
};
CompareContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitCompare(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function UnaryOperatorContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

UnaryOperatorContext.prototype = Object.create(ExprContext.prototype);
UnaryOperatorContext.prototype.constructor = UnaryOperatorContext;

FormulaParser.UnaryOperatorContext = UnaryOperatorContext;

UnaryOperatorContext.prototype.expr = function() {
    return this.getTypedRuleContext(ExprContext,0);
};

UnaryOperatorContext.prototype.MINUS = function() {
    return this.getToken(FormulaParser.MINUS, 0);
};

UnaryOperatorContext.prototype.NOT = function() {
    return this.getToken(FormulaParser.NOT, 0);
};
UnaryOperatorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitUnaryOperator(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function OrContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

OrContext.prototype = Object.create(ExprContext.prototype);
OrContext.prototype.constructor = OrContext;

FormulaParser.OrContext = OrContext;

OrContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

OrContext.prototype.OR = function() {
    return this.getToken(FormulaParser.OR, 0);
};
OrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitOr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function DoubleContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

DoubleContext.prototype = Object.create(ExprContext.prototype);
DoubleContext.prototype.constructor = DoubleContext;

FormulaParser.DoubleContext = DoubleContext;

DoubleContext.prototype.DOUBLE = function() {
    return this.getToken(FormulaParser.DOUBLE, 0);
};
DoubleContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitDouble(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function ListContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

ListContext.prototype = Object.create(ExprContext.prototype);
ListContext.prototype.constructor = ListContext;

FormulaParser.ListContext = ListContext;

ListContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

ListContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FormulaParser.COMMA);
    } else {
        return this.getToken(FormulaParser.COMMA, i);
    }
};

ListContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitList(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function IntContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

IntContext.prototype = Object.create(ExprContext.prototype);
IntContext.prototype.constructor = IntContext;

FormulaParser.IntContext = IntContext;

IntContext.prototype.INT = function() {
    return this.getToken(FormulaParser.INT, 0);
};
IntContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitInt(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function MulDivContext(parser, ctx) {
	ExprContext.call(this, parser);
    this.op = null; // Token;
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

MulDivContext.prototype = Object.create(ExprContext.prototype);
MulDivContext.prototype.constructor = MulDivContext;

FormulaParser.MulDivContext = MulDivContext;

MulDivContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

MulDivContext.prototype.MULTIPLY = function() {
    return this.getToken(FormulaParser.MULTIPLY, 0);
};

MulDivContext.prototype.DIVIDE = function() {
    return this.getToken(FormulaParser.DIVIDE, 0);
};
MulDivContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitMulDiv(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function StrContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

StrContext.prototype = Object.create(ExprContext.prototype);
StrContext.prototype.constructor = StrContext;

FormulaParser.StrContext = StrContext;

StrContext.prototype.String = function() {
    return this.getToken(FormulaParser.String, 0);
};
StrContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitStr(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FieldContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FieldContext.prototype = Object.create(ExprContext.prototype);
FieldContext.prototype.constructor = FieldContext;

FormulaParser.FieldContext = FieldContext;

FieldContext.prototype.INT = function() {
    return this.getToken(FormulaParser.INT, 0);
};
FieldContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitField(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function FuncContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

FuncContext.prototype = Object.create(ExprContext.prototype);
FuncContext.prototype.constructor = FuncContext;

FormulaParser.FuncContext = FuncContext;

FuncContext.prototype.ID = function() {
    return this.getToken(FormulaParser.ID, 0);
};

FuncContext.prototype.LPAREN = function() {
    return this.getToken(FormulaParser.LPAREN, 0);
};

FuncContext.prototype.RPAREN = function() {
    return this.getToken(FormulaParser.RPAREN, 0);
};

FuncContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

FuncContext.prototype.COMMA = function(i) {
	if(i===undefined) {
		i = null;
	}
    if(i===null) {
        return this.getTokens(FormulaParser.COMMA);
    } else {
        return this.getToken(FormulaParser.COMMA, i);
    }
};

FuncContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitFunc(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function AndContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

AndContext.prototype = Object.create(ExprContext.prototype);
AndContext.prototype.constructor = AndContext;

FormulaParser.AndContext = AndContext;

AndContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

AndContext.prototype.AND = function() {
    return this.getToken(FormulaParser.AND, 0);
};
AndContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitAnd(this);
    } else {
        return visitor.visitChildren(this);
    }
};


function XorContext(parser, ctx) {
	ExprContext.call(this, parser);
    ExprContext.prototype.copyFrom.call(this, ctx);
    return this;
}

XorContext.prototype = Object.create(ExprContext.prototype);
XorContext.prototype.constructor = XorContext;

FormulaParser.XorContext = XorContext;

XorContext.prototype.expr = function(i) {
    if(i===undefined) {
        i = null;
    }
    if(i===null) {
        return this.getTypedRuleContexts(ExprContext);
    } else {
        return this.getTypedRuleContext(ExprContext,i);
    }
};

XorContext.prototype.XOR = function() {
    return this.getToken(FormulaParser.XOR, 0);
};
XorContext.prototype.accept = function(visitor) {
    if ( visitor instanceof FormulaVisitor ) {
        return visitor.visitXor(this);
    } else {
        return visitor.visitChildren(this);
    }
};



FormulaParser.prototype.expr = function(_p) {
	if(_p===undefined) {
	    _p = 0;
	}
    var _parentctx = this._ctx;
    var _parentState = this.state;
    var localctx = new ExprContext(this, this._ctx, _parentState);
    var _prevctx = localctx;
    var _startState = 2;
    this.enterRecursionRule(localctx, 2, FormulaParser.RULE_expr, _p);
    var _la = 0; // Token type
    try {
        this.enterOuterAlt(localctx, 1);
        this.state = 43;
        this._errHandler.sync(this);
        switch(this._input.LA(1)) {
        case FormulaParser.INT:
            localctx = new IntContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;

            this.state = 7;
            this.match(FormulaParser.INT);
            break;
        case FormulaParser.DOUBLE:
            localctx = new DoubleContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 8;
            this.match(FormulaParser.DOUBLE);
            break;
        case FormulaParser.String:
            localctx = new StrContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 9;
            this.match(FormulaParser.String);
            break;
        case FormulaParser.T__0:
            localctx = new FieldContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 10;
            this.match(FormulaParser.T__0);
            this.state = 11;
            this.match(FormulaParser.INT);
            break;
        case FormulaParser.LPAREN:
            localctx = new ParensContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 12;
            this.match(FormulaParser.LPAREN);
            this.state = 13;
            this.expr(0);
            this.state = 14;
            this.match(FormulaParser.RPAREN);
            break;
        case FormulaParser.ID:
            localctx = new FuncContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 16;
            this.match(FormulaParser.ID);
            this.state = 17;
            this.match(FormulaParser.LPAREN);
            this.state = 26;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FormulaParser.T__0) | (1 << FormulaParser.T__1) | (1 << FormulaParser.MINUS) | (1 << FormulaParser.LPAREN) | (1 << FormulaParser.NOT) | (1 << FormulaParser.ID) | (1 << FormulaParser.INT) | (1 << FormulaParser.DOUBLE) | (1 << FormulaParser.String))) !== 0)) {
                this.state = 18;
                this.expr(0);
                this.state = 23;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===FormulaParser.COMMA) {
                    this.state = 19;
                    this.match(FormulaParser.COMMA);
                    this.state = 20;
                    this.expr(0);
                    this.state = 25;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 28;
            this.match(FormulaParser.RPAREN);
            break;
        case FormulaParser.T__1:
            localctx = new ListContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 29;
            this.match(FormulaParser.T__1);
            this.state = 38;
            this._errHandler.sync(this);
            _la = this._input.LA(1);
            if((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FormulaParser.T__0) | (1 << FormulaParser.T__1) | (1 << FormulaParser.MINUS) | (1 << FormulaParser.LPAREN) | (1 << FormulaParser.NOT) | (1 << FormulaParser.ID) | (1 << FormulaParser.INT) | (1 << FormulaParser.DOUBLE) | (1 << FormulaParser.String))) !== 0)) {
                this.state = 30;
                this.expr(0);
                this.state = 35;
                this._errHandler.sync(this);
                _la = this._input.LA(1);
                while(_la===FormulaParser.COMMA) {
                    this.state = 31;
                    this.match(FormulaParser.COMMA);
                    this.state = 32;
                    this.expr(0);
                    this.state = 37;
                    this._errHandler.sync(this);
                    _la = this._input.LA(1);
                }
            }

            this.state = 40;
            this.match(FormulaParser.T__2);
            break;
        case FormulaParser.MINUS:
        case FormulaParser.NOT:
            localctx = new UnaryOperatorContext(this, localctx);
            this._ctx = localctx;
            _prevctx = localctx;
            this.state = 41;
            localctx.op = this._input.LT(1);
            _la = this._input.LA(1);
            if(!(_la===FormulaParser.MINUS || _la===FormulaParser.NOT)) {
                localctx.op = this._errHandler.recoverInline(this);
            }
            else {
            	this._errHandler.reportMatch(this);
                this.consume();
            }
            this.state = 42;
            this.expr(7);
            break;
        default:
            throw new antlr4.error.NoViableAltException(this);
        }
        this._ctx.stop = this._input.LT(-1);
        this.state = 65;
        this._errHandler.sync(this);
        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
            if(_alt===1) {
                if(this._parseListeners!==null) {
                    this.triggerExitRuleEvent();
                }
                _prevctx = localctx;
                this.state = 63;
                this._errHandler.sync(this);
                var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
                switch(la_) {
                case 1:
                    localctx = new MulDivContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 45;
                    if (!( this.precpred(this._ctx, 6))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
                    }
                    this.state = 46;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===FormulaParser.MULTIPLY || _la===FormulaParser.DIVIDE)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 47;
                    this.expr(7);
                    break;

                case 2:
                    localctx = new PlusMinusContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 48;
                    if (!( this.precpred(this._ctx, 5))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
                    }
                    this.state = 49;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!(_la===FormulaParser.PLUS || _la===FormulaParser.MINUS)) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 50;
                    this.expr(6);
                    break;

                case 3:
                    localctx = new CompareContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 51;
                    if (!( this.precpred(this._ctx, 4))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
                    }
                    this.state = 52;
                    localctx.op = this._input.LT(1);
                    _la = this._input.LA(1);
                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << FormulaParser.EQ) | (1 << FormulaParser.NEQ) | (1 << FormulaParser.LT) | (1 << FormulaParser.LE) | (1 << FormulaParser.GT) | (1 << FormulaParser.GE))) !== 0))) {
                        localctx.op = this._errHandler.recoverInline(this);
                    }
                    else {
                    	this._errHandler.reportMatch(this);
                        this.consume();
                    }
                    this.state = 53;
                    this.expr(5);
                    break;

                case 4:
                    localctx = new XorContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 54;
                    if (!( this.precpred(this._ctx, 3))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
                    }
                    this.state = 55;
                    this.match(FormulaParser.XOR);
                    this.state = 56;
                    this.expr(4);
                    break;

                case 5:
                    localctx = new AndContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 57;
                    if (!( this.precpred(this._ctx, 2))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
                    }
                    this.state = 58;
                    this.match(FormulaParser.AND);
                    this.state = 59;
                    this.expr(3);
                    break;

                case 6:
                    localctx = new OrContext(this, new ExprContext(this, _parentctx, _parentState));
                    this.pushNewRecursionContext(localctx, _startState, FormulaParser.RULE_expr);
                    this.state = 60;
                    if (!( this.precpred(this._ctx, 1))) {
                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
                    }
                    this.state = 61;
                    this.match(FormulaParser.OR);
                    this.state = 62;
                    this.expr(2);
                    break;

                } 
            }
            this.state = 67;
            this._errHandler.sync(this);
            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
        }

    } catch( error) {
        if(error instanceof antlr4.error.RecognitionException) {
	        localctx.exception = error;
	        this._errHandler.reportError(this, error);
	        this._errHandler.recover(this, error);
	    } else {
	    	throw error;
	    }
    } finally {
        this.unrollRecursionContexts(_parentctx)
    }
    return localctx;
};


FormulaParser.prototype.sempred = function(localctx, ruleIndex, predIndex) {
	switch(ruleIndex) {
	case 1:
			return this.expr_sempred(localctx, predIndex);
    default:
        throw "No predicate with index:" + ruleIndex;
   }
};

FormulaParser.prototype.expr_sempred = function(localctx, predIndex) {
	switch(predIndex) {
		case 0:
			return this.precpred(this._ctx, 6);
		case 1:
			return this.precpred(this._ctx, 5);
		case 2:
			return this.precpred(this._ctx, 4);
		case 3:
			return this.precpred(this._ctx, 3);
		case 4:
			return this.precpred(this._ctx, 2);
		case 5:
			return this.precpred(this._ctx, 1);
		default:
			throw "No predicate with index:" + predIndex;
	}
};


exports.FormulaParser = FormulaParser;
