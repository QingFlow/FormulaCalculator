'use strict';

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _parseFloat = require('babel-runtime/core-js/number/parse-float');

var _parseFloat2 = _interopRequireDefault(_parseFloat);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;
var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
var moment = require('moment');
var FormulaError = require('./FormulaError').FormulaError;
var Function = require('./Function').Function;
var checkValueType = require('./Utils').checkValueType;
var replaceNullParam = require('./Utils').replaceNullParam;

var MyFormulaVisitor = function (_FormulaVisitor) {
    (0, _inherits3.default)(MyFormulaVisitor, _FormulaVisitor);

    function MyFormulaVisitor() {
        (0, _classCallCheck3.default)(this, MyFormulaVisitor);

        var _this = (0, _possibleConstructorReturn3.default)(this, (MyFormulaVisitor.__proto__ || (0, _getPrototypeOf2.default)(MyFormulaVisitor)).call(this));

        _this.params = arguments[0]; // 公式计算所需的其他参数
        _this.functionMap = new Function().getFuncMap(); // 获取所有一般方法
        _this.userInfoFunctionMap = new Function().getFuncMapWithParam(); // 获取所有需要用户信息来计算的方法
        return _this;
    }

    (0, _createClass3.default)(MyFormulaVisitor, [{
        key: 'visitNull',
        value: function visitNull(ctx) {
            return null;
        }

        // 一元操作符

    }, {
        key: 'visitUnaryOperator',
        value: function visitUnaryOperator(ctx) {
            var value = this.visit(ctx.expr());
            checkValueType('number', 'MINUS', 0, value);
            return -(0, _parseFloat2.default)(value);
        }

        // 解析加减法

    }, {
        key: 'visitPlusMinus',
        value: function visitPlusMinus(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            // var values = [ value1, value2 ];
            if ((0, _util.isNullOrUndefined)(value1) || value1.constructor.name !== 'Array') {
                value1 = [value1];
            }
            var values = value1.concat(value2);
            values = replaceNullParam(values);
            // 类型检查
            checkValueType('number', 'MINUS', 0, values);
            switch (ctx.op.type) {
                case FormulaParser.PLUS:
                    return values.reduce(function (pre, next) {
                        return (0, _parseFloat2.default)(pre).add((0, _parseFloat2.default)(next));
                    });
                case FormulaParser.MINUS:
                    return values.reduce(function (pre, next) {
                        return (0, _parseFloat2.default)(pre).sub((0, _parseFloat2.default)(next));
                    });
            }
        }
    }, {
        key: 'visitInt',


        //解析整数
        value: function visitInt(ctx) {
            return (0, _parseInt2.default)(ctx.INT().getText());
        }
        //解析浮点数

    }, {
        key: 'visitDouble',
        value: function visitDouble(ctx) {
            return (0, _parseFloat2.default)(ctx.DOUBLE().getText());
        }
        // 解析布尔值

    }, {
        key: 'visitBool',
        value: function visitBool(ctx) {
            switch (ctx.op.type) {
                case FormulaParser.TRUE:
                    return true;
                case FormulaParser.FALSE:
                    return false;
            }
        }
        // 解析括号

    }, {
        key: 'visitParens',
        value: function visitParens(ctx) {
            return this.visit(ctx.expr());
        }
        // 解析一些比较符号

    }, {
        key: 'visitCompare',
        value: function visitCompare(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            // 类型检查
            switch (ctx.op.type) {
                case FormulaParser.LT:
                case FormulaParser.LE:
                case FormulaParser.GT:
                case FormulaParser.GE:
                    checkValueType('number', 'COMPARE', 0, value1, value2);
            }
            switch (ctx.op.type) {
                case FormulaParser.EQ:
                    return value1 === value2;
                case FormulaParser.NEQ:
                    return value1 !== value2;
                case FormulaParser.LT:
                    return value1 < value2;
                case FormulaParser.LE:
                    return value1 <= value2;
                case FormulaParser.GT:
                    return value1 > value2;
                case FormulaParser.GE:
                    return value1 >= value2;
            }
        }
        // 解析数组

    }, {
        key: 'visitList',
        value: function visitList(ctx) {
            var result = [];
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(ctx.expr()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var val = _step.value;

                    result.push(this.visit(val));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return result;
        }
        // 解析乘除法[todo: 因为都转化成了浮点数，所以会有问题]

    }, {
        key: 'visitMulDiv',
        value: function visitMulDiv(ctx) {
            var value1 = (0, _parseFloat2.default)(this.visit(ctx.expr(0)));
            var value2 = (0, _parseFloat2.default)(this.visit(ctx.expr(1)));
            var values = [value1, value2];
            values = replaceNullParam(values);
            switch (ctx.op.type) {
                case FormulaParser.MULTIPLY:
                    // 类型解析
                    checkValueType('number', 'MULTIPLE', 0, values);
                    var result = 1;
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                        for (var _iterator2 = (0, _getIterator3.default)(values), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                            var v = _step2.value;

                            result = result.mul((0, _parseFloat2.default)(v));
                        }
                    } catch (err) {
                        _didIteratorError2 = true;
                        _iteratorError2 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }
                        } finally {
                            if (_didIteratorError2) {
                                throw _iteratorError2;
                            }
                        }
                    }

                    return result;
                case FormulaParser.DIVIDE:
                    // 类型解析
                    checkValueType('number', 'DIVIDE', 0, value2);
                    var result;
                    for (var i = 0; i < values.length; i++) {
                        if (i === 0) {
                            result = values[i];
                        } else if (values[i] === 0) {
                            result = 0;
                        } else {
                            result = result.div((0, _parseFloat2.default)(values[i]));
                        }
                    }
                    return result;
                default:
                    return 0; // todo: 报错
            }
        }
        // 解析字符串

    }, {
        key: 'visitStr',
        value: function visitStr(ctx) {
            var value = ctx.String().getText();
            return value.substring(1, value.length - 1);
        }
        // 解析函数

    }, {
        key: 'visitFunc',
        value: function visitFunc(ctx) {
            var funcName = ctx.ID().getText();
            // 检查函数名是否存在于 预定义的函数中
            if (funcName in this.functionMap) {
                var _functionMap;

                var paramList = [];
                // 先拿到参数
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = (0, _getIterator3.default)(ctx.expr()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var val = _step3.value;

                        paramList.push(this.visit(val));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3.return) {
                            _iterator3.return();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return (_functionMap = this.functionMap)[funcName].apply(_functionMap, paramList);
            }
            // 如果方法为用户信息相关方法，则把参数信息传递过去
            else if (funcName in this.userInfoFunctionMap) {
                    return this.userInfoFunctionMap[funcName](this.params);
                } else {
                    // todo: 抛出异常
                }
        }
        // 解析错误输入

    }, {
        key: 'visitError',
        value: function visitError(ctx) {
            var err = new FormulaError({
                errCode: 4
            });
            throw err;
        }
    }]);
    return MyFormulaVisitor;
}(FormulaVisitor);

module.exports.MyFormulaVisitor = MyFormulaVisitor;