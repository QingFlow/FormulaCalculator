'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormulaVisitor = require('../token_parse/FormulaVisitor').FormulaVisitor;
var FormulaParser = require('../token_parse/FormulaParser').FormulaParser;
var moment = require('moment');
var QfErr = require('./FormulaError').FormulaError;

var MyFormulaVisitor = function (_FormulaVisitor) {
    _inherits(MyFormulaVisitor, _FormulaVisitor);

    function MyFormulaVisitor() {
        _classCallCheck(this, MyFormulaVisitor);

        var _this = _possibleConstructorReturn(this, (MyFormulaVisitor.__proto__ || Object.getPrototypeOf(MyFormulaVisitor)).call(this));

        _this.functionMap = new Function().getFuncMap();
        return _this;
    }

    // 一元操作符


    _createClass(MyFormulaVisitor, [{
        key: 'visitUnaryOperator',
        value: function visitUnaryOperator(ctx) {
            var value = this.visit(ctx.expr());
            switch (ctx.op.type) {
                case FormulaParser.NOT:
                    checkValueType(value, 'boolean');
                    return !value;
                case FormulaParser.MINUS:
                    checkValueType(value, 'number');
                    return -Number.parseFloat(value);
            }
        }

        // 解析加减法

    }, {
        key: 'visitPlusMinus',
        value: function visitPlusMinus(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            // 类型检查
            checkValueType(value1, 'number');
            checkValueType(value2, 'number');
            switch (ctx.op.type) {
                case FormulaParser.PLUS:
                    return value1 + value2;
                case FormulaParser.MINUS:
                    return value1 - value2;
            }
        }
    }, {
        key: 'visitInt',


        //解析整数
        value: function visitInt(ctx) {
            return Number.parseInt(ctx.INT().getText());
        }
        //解析浮点数

    }, {
        key: 'visitDouble',
        value: function visitDouble(ctx) {
            return Number.parseFloat(ctx.DOUBLE().getText());
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
                    checkValueType(value1, 'number');
                    checkValueType(value2, 'number');
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
        // 解析or操作

    }, {
        key: 'visitOr',
        value: function visitOr(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            // 类型检查
            checkValueType(value1, 'boolean');
            checkValueType(value2, 'boolean');
            return value1 || value2;
        }
        // 解析and操作

    }, {
        key: 'visitAnd',
        value: function visitAnd(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            // 类型检查
            checkValueType(value1, 'boolean');
            checkValueType(value2, 'boolean');
            return value1 && value2;
        }
        // 解析抑或

    }, {
        key: 'visitXor',
        value: function visitXor(ctx) {
            var value1 = this.visit(ctx.expr(0));
            var value2 = this.visit(ctx.expr(1));
            return value1 ^ value2;
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
                for (var _iterator = ctx.expr()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
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
            var value1 = Number.parseFloat(this.visit(ctx.expr(0)));
            var value2 = Number.parseFloat(this.visit(ctx.expr(1)));
            // 类型解析
            checkValueType(value1, 'number');
            checkValueType(value2, 'number');
            switch (ctx.op.type) {
                case FormulaParser.MULTIPLY:
                    return value1 * value2;
                case FormulaParser.DIVIDE:
                    return value1 / value2;
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
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = ctx.expr()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var val = _step2.value;

                        paramList.push(this.visit(val));
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

                return (_functionMap = this.functionMap)[funcName].apply(_functionMap, paramList);
            } else {
                // todo: 抛出异常
            }
        }
        // 解析错误输入

    }, {
        key: 'visitError',
        value: function visitError(ctx) {
            var err = new QfErr({
                errCode: 4
            });
            throw err;
        }
    }]);

    return MyFormulaVisitor;
}(FormulaVisitor);

/**
 * 函数的定义
 */


var Function = function () {
    function Function() {
        _classCallCheck(this, Function);
    }

    _createClass(Function, [{
        key: 'getFuncMap',
        value: function getFuncMap() {
            return {
                'IF': this.funcIf,
                'CONCAT': this.funcConcat,
                'LEFT': this.funcLeft,
                'REPLACE': this.funcReplace,
                'MID': this.funcMid,
                'TEXT': this.funcText,
                'SUM': this.funcSum,
                'AVERAGE': this.funcAverage,
                'COUNT': this.funcCount,
                'MIN': this.funcMin,
                'MAX': this.funcMax,
                'ROUND': this.funcRound,
                'INT': this.funcInt,
                'MOD': this.funcMod,
                'PRODUCT': this.funcProduct,
                'SUMPRODUCT': this.funcSumProduct,
                'YEAR': this.funcYear,
                'MONTH': this.funcMonth,
                'DAY': this.funcDay,
                'HOUR': this.funcHour,
                'MINUTE': this.funcMinite,
                'SECOND': this.funcSecond,
                'DATE': this.funcDate,
                'CURDATE': this.funcCurDate,
                'NOW': this.funcNow,
                'RDID': this.funcRDID
            };
        }
        // if表达式

    }, {
        key: 'funcIf',
        value: function funcIf(test, value1, value2) {
            checkValueType(test, 'boolean');
            return test ? value1 : value2;
        }
        // 把字符串串起来

    }, {
        key: 'funcConcat',
        value: function funcConcat() {
            var _ref;

            for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
                values[_key] = arguments[_key];
            }

            values = (_ref = []).concat.apply(_ref, _toConsumableArray(values)); // flat
            return values.join('');
        }
        // 取左边的n个数

    }, {
        key: 'funcLeft',
        value: function funcLeft(value, n) {
            value = String(value);
            return value.substr(0, n);
        }
        // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）

    }, {
        key: 'funcReplace',
        value: function funcReplace(value, start, n, newValue) {
            value = String(value);
            newValue = String(newValue);
            return value.substring(0, start - 1) + newValue + value.substr(start + n - 1);
        }
        // 取中间的子串，从start开始，取长度为n的子串

    }, {
        key: 'funcMid',
        value: function funcMid(value, start, n) {
            value = String(value);
            return value.substr(start - 1, n);
        }
        // 把时间转化为字符串

    }, {
        key: 'funcText',
        value: function funcText(value, timeFormat) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.format(timeFormat);
        }
        // 求和

    }, {
        key: 'funcSum',
        value: function funcSum() {
            var _ref2;

            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            values = (_ref2 = []).concat.apply(_ref2, _toConsumableArray(values)); // flat
            // 类型检查
            values.every(function (val) {
                checkValueType(val, 'number');
                return true;
            });
            return values.reduce(function (pre, next) {
                return Number.parseFloat(pre) + Number.parseFloat(next);
            });
        }
        // 平均数

    }, {
        key: 'funcAverage',
        value: function funcAverage() {
            var _ref3;

            for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                values[_key3] = arguments[_key3];
            }

            values = (_ref3 = []).concat.apply(_ref3, _toConsumableArray(values)); // flat
            // 类型检查
            values.every(function (val) {
                checkValueType(val, 'number');
                return true;
            });
            var sum = values.reduce(function (pre, next) {
                return Number.parseFloat(pre) + Number.parseFloat(next);
            });
            return sum / values.length;
        }
        // 计数

    }, {
        key: 'funcCount',
        value: function funcCount() {
            var _ref4;

            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                values[_key4] = arguments[_key4];
            }

            values = (_ref4 = []).concat.apply(_ref4, _toConsumableArray(values)); // flat
            return values.length;
        }
        // 最小值

    }, {
        key: 'funcMin',
        value: function funcMin() {
            var _ref5;

            for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                values[_key5] = arguments[_key5];
            }

            values = (_ref5 = []).concat.apply(_ref5, _toConsumableArray(values)); // flat
            // 类型检查
            values.every(function (val) {
                checkValueType(val, 'number');
                return true;
            });
            var min = Number.MIN_VALUE;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = values[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var v = _step3.value;

                    if (min > v) {
                        min = v;
                    }
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

            return min;
        }
        // 最大值

    }, {
        key: 'funcMax',
        value: function funcMax() {
            var _ref6;

            for (var _len6 = arguments.length, values = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                values[_key6] = arguments[_key6];
            }

            values = (_ref6 = []).concat.apply(_ref6, _toConsumableArray(values)); // flat
            // 类型检查
            values.every(function (val) {
                checkValueType(val, 'number');
                return true;
            });
            var max = Number.MAX_VALUE;
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = values[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var v = _step4.value;

                    if (max < v) {
                        max = v;
                    }
                }
            } catch (err) {
                _didIteratorError4 = true;
                _iteratorError4 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                        _iterator4.return();
                    }
                } finally {
                    if (_didIteratorError4) {
                        throw _iteratorError4;
                    }
                }
            }

            return max;
        }
        // 四舍五入

    }, {
        key: 'funcRound',
        value: function funcRound(value, n) {
            checkValueType(value, 'number');
            checkValueType(n, 'number');
            return Math.round(value * 10 ** n) / 10 ** n;
        }
        // 取整数

    }, {
        key: 'funcInt',
        value: function funcInt(value) {
            checkValueType(value, 'number');
            return Number.parseInt(value);
        }
        // 取余（mod操作）

    }, {
        key: 'funcMod',
        value: function funcMod(value, divisor) {
            checkValueType(value, 'number');
            checkValueType(divisor, 'number');
            return Number.parseInt(value) % Number.parseInt(divisor);
        }
        // 连乘（product是office里面的称呼）

    }, {
        key: 'funcProduct',
        value: function funcProduct() {
            var _ref7;

            for (var _len7 = arguments.length, values = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                values[_key7] = arguments[_key7];
            }

            values = (_ref7 = []).concat.apply(_ref7, _toConsumableArray(values)); // flat
            // 类型检查
            values.every(function (val) {
                checkValueType(val, 'number');
                return true;
            });
            var result = 1;
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = values[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var v = _step5.value;

                    result *= Number.parseFloat(v);
                }
            } catch (err) {
                _didIteratorError5 = true;
                _iteratorError5 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
                        _iterator5.return();
                    }
                } finally {
                    if (_didIteratorError5) {
                        throw _iteratorError5;
                    }
                }
            }

            return result;
        }
        // 连乘后相加

    }, {
        key: 'funcSumProduct',
        value: function funcSumProduct() {
            var result = 0;

            for (var _len8 = arguments.length, values = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                values[_key8] = arguments[_key8];
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = values[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var v = _step6.value;

                    // 数组
                    if ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object') {
                        var r2 = 1;
                        var _iteratorNormalCompletion7 = true;
                        var _didIteratorError7 = false;
                        var _iteratorError7 = undefined;

                        try {
                            for (var _iterator7 = v[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                                var v2 = _step7.value;

                                r2 *= Number.parseFloat(v2);
                            }
                        } catch (err) {
                            _didIteratorError7 = true;
                            _iteratorError7 = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion7 && _iterator7.return) {
                                    _iterator7.return();
                                }
                            } finally {
                                if (_didIteratorError7) {
                                    throw _iteratorError7;
                                }
                            }
                        }

                        result += r2;
                    }
                    // 普通数字
                    else {
                            result += Number.parseFloat(v);
                        }
                }
            } catch (err) {
                _didIteratorError6 = true;
                _iteratorError6 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
                        _iterator6.return();
                    }
                } finally {
                    if (_didIteratorError6) {
                        throw _iteratorError6;
                    }
                }
            }

            return result;
        }
        // 拿到年份

    }, {
        key: 'funcYear',
        value: function funcYear(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.year();
        }
        // 拿到月份：注意，用moment拿月份时，是从0~11来计算的

    }, {
        key: 'funcMonth',
        value: function funcMonth(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.month() + 1;
        }
        // 拿到月份中的day

    }, {
        key: 'funcDay',
        value: function funcDay(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.date();
        }
        // 时

    }, {
        key: 'funcHour',
        value: function funcHour(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.hour();
        }
        // 分

    }, {
        key: 'funcMinite',
        value: function funcMinite(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.minute();
        }
        // 秒

    }, {
        key: 'funcSecond',
        value: function funcSecond(value) {
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.second();
        }
        // 组装出日期

    }, {
        key: 'funcDate',
        value: function funcDate(Y, M, D, H, m, s) {
            var t = moment();
            t.year(Number.parseInt(Y));
            t.month(Number.parseInt(M) - 1);
            t.date(Number.parseInt(D));
            t.hour(Number.parseInt(H));
            t.minute(Number.parseInt(m));
            t.second(Number.parseInt(s));
            return t.format('YYYY-MM-DD HH:mm:ss');
        }
        // 当前的日期

    }, {
        key: 'funcCurDate',
        value: function funcCurDate() {
            var t = moment();
            return t.format('YYYY-MM-DD');
        }
        // 当前时间

    }, {
        key: 'funcNow',
        value: function funcNow() {
            return moment().format('YYYY-MM-DD HH:mm:ss');
        }
        // 生成随机码

    }, {
        key: 'funcRDID',
        value: function funcRDID() {
            return uuid();
        }
    }]);

    return Function;
}();

/**
 * guid简单的生成器（参见https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript）
 */


function uuid() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : r & 0x3 | 0x8).toString(16);
    });
}

/**
 * 检查值的类型，并抛出错误
 * @param {*} value 要检查类型的值
 * @param {*} type 值应该的类型，如“number”，“boolean”， “string”，必须字符床
 */
function checkValueType(value, type) {
    if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== type) {
        var err = new QfErr({
            errCode: 2
        });
        throw err;
    }
}

module.exports.MyFormulaVisitor = MyFormulaVisitor;