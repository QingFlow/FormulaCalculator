'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Function = undefined;

var _parseInt = require('babel-runtime/core-js/number/parse-int');

var _parseInt2 = _interopRequireDefault(_parseInt);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _parseFloat = require('babel-runtime/core-js/number/parse-float');

var _parseFloat2 = _interopRequireDefault(_parseFloat);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkValueType = require('./Utils').checkValueType;
var checkParamCount = require('./Utils').checkParamCount;
var reverse = require('./Utils').reverse;
var removeNullParam = require('./Utils').removeNullParam;
var replaceNullParam = require('./Utils').replaceNullParam;
var getFirstNum = require('./Utils').getFirstNum;
var moment = require('moment');
/**
 * 函数的定义
 */

var Function = exports.Function = function () {
    function Function() {
        (0, _classCallCheck3.default)(this, Function);
    }

    (0, _createClass3.default)(Function, [{
        key: 'getFuncMap',

        // 获取一般方法的列表
        value: function getFuncMap() {
            return {
                'IF': this.funcIf,
                'CONCAT': this.funcConcat,
                'LEFT': this.funcLeft,
                'RIGHT': this.funcRight,
                'REPLACE': this.funcReplace,
                'MID': this.funcMid,
                'TEXT': this.funcText,
                'NUM': this.funNum,
                'RMBUPPER': this.funRmbUpper,
                'SUM': this.funcSum,
                'SUMIF': this.funcSumIf,
                'AVERAGE': this.funcAverage,
                'COUNT': this.funcCount,
                'MIN': this.funcMin,
                'MAX': this.funcMax,
                'ROUND': this.funcRound,
                'ROUNDUP': this.funcRoundUp,
                'ROUNDDOWN': this.funcRoundDown,
                'INT': this.funcInt,
                'MOD': this.funcMod,
                'PRODUCT': this.funcProduct,
                'SUMPRODUCT': this.funcSumProduct,
                'POWER': this.funcPower,
                'YEAR': this.funcYear,
                'MONTH': this.funcMonth,
                'DAY': this.funcDay,
                'HOUR': this.funcHour,
                'MINUTE': this.funcMinite,
                'SECOND': this.funcSecond,
                'DATE': this.funcDate,
                'CURDATE': this.funcCurDate,
                'NOW': this.funcNow,
                'RDID': this.funcRDID,
                'UPPER': this.funcUpper,
                'LOWER': this.funcLower,
                'AND': this.funcAnd,
                'OR': this.funcOr,
                'NOT': this.funcNot,
                'XOR': this.funcXor,
                'ISEMPTY': this.funcIsEmpty,
                'SEARCH': this.funcSearch,
                'LEN': this.funcLen,
                'DAYS': this.funcDays,
                'DATEDELTA': this.funcDateDelta
            };
        }

        // 获取所有需要用户信息来计算的方法

    }, {
        key: 'getFuncMapWithParam',
        value: function getFuncMapWithParam() {
            return {
                'GETUSERNAME': this.funcGetUserName,
                'GETUSEREMAIL': this.funcGetUserEmail,
                'JAID': this.funJAaId,
                'JANAME': this.funJaName,
                'JATYPE': this.funJaType,
                'JADEPTID': this.funJaDeptId,
                'JADEPTNAME': this.funJaDeptName,
                'RECNO': this.funcRecno
            };
        }
        // if表达式

    }, {
        key: 'funcIf',
        value: function funcIf(test, value1, value2) {
            checkValueType('boolean', 'IF', 0, test);
            checkParamCount('IF', 3, arguments);
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

            values = (_ref = []).concat.apply(_ref, (0, _toConsumableArray3.default)(values)); // flat
            return values.join('');
        }
        // 取左边的n个数

    }, {
        key: 'funcLeft',
        value: function funcLeft(value, n) {
            checkValueType('number', 'LEFT', 1, n);
            checkParamCount('LEFT', 2, arguments);
            value = String(value);
            return value.substr(0, n);
        }
        // 取右边的n个数

    }, {
        key: 'funcRight',
        value: function funcRight(value, n) {
            checkValueType('number', 'RIGHT', 1, n);
            checkParamCount('RIGHT', 2, arguments);
            return reverse(reverse(value).substr(0, n));
        }
        // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）

    }, {
        key: 'funcReplace',
        value: function funcReplace(value, start, n, newValue) {
            value = String(value);
            newValue = String(newValue);
            checkValueType('number', 'REPLACE', 1, start, n);
            checkParamCount('REPLACE', 4, arguments);
            return value.substring(0, start - 1) + newValue + value.substr(start + n - 1);
        }
        // 取中间的子串，从start开始，取长度为n的子串

    }, {
        key: 'funcMid',
        value: function funcMid(value, start, n) {
            checkParamCount('MID', 3, arguments);
            value = String(value);
            return value.substr(start - 1, n);
        }
        // 把时间转化为字符串

    }, {
        key: 'funcText',
        value: function funcText(value, timeFormat) {
            checkParamCount('TEXT', 2, arguments);
            if (timeFormat === 'E') {
                moment.locale('en');
                return moment(value).format('e');
            } else if (timeFormat === 'EE') {
                moment.locale('zh-cn');
                return moment(value).format('ddd');
            } else if (timeFormat === 'EEE') {
                moment.locale('zh-cn');
                return moment(value).format('dddd');
            } else if (timeFormat) {
                var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
                return t.format(timeFormat);
            } else {
                return '"' + value + '"';
            }
        }
        // 把其他类型的字段转换成数字类型，可以识别浮点类型

    }, {
        key: 'funNum',
        value: function funNum() {
            var _ref2;

            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            values = (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray3.default)(values));
            if (values.length < 2) {
                return getFirstNum(values[0]);
            } else {
                return values.map(function (val) {
                    return getFirstNum(val);
                });
            }
        }

        // 数字转化为人民币大写形式

    }, {
        key: 'funRmbUpper',
        value: function funRmbUpper(value) {
            //汉字的数字
            var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
            //基本单位
            var cnIntRadice = new Array('', '拾', '佰', '仟');
            //对应整数部分扩展单位
            var cnIntUnits = new Array('', '万', '亿', '兆');
            //对应小数部分单位
            var cnDecUnits = new Array('角', '分', '毫', '厘');
            //整数金额时后面跟的字符
            var cnInteger = '整';
            //整型完以后的单位
            var cnIntLast = '元';
            //最大处理的数字
            var maxNum = 999999999999999.9999;
            //金额整数部分
            var integerNum;
            //金额小数部分
            var decimalNum;
            //输出的中文金额字符串
            var chineseStr = '';
            //分离金额后用的数组，预定义
            var parts;
            if (value == '') {
                return '';
            }
            value = parseFloat(value);
            if (value >= maxNum) {
                //超出最大处理数字
                return '';
            }
            if (value == 0) {
                chineseStr = cnNums[0] + cnIntLast + cnInteger;
                return chineseStr;
            }
            //转换为字符串
            value = value.toString();
            if (value.indexOf('.') == -1) {
                integerNum = value;
                decimalNum = '';
            } else {
                parts = value.split('.');
                integerNum = parts[0];
                decimalNum = parts[1].substr(0, 4);
            }
            //获取整型部分转换
            if (parseInt(integerNum, 10) > 0) {
                var zeroCount = 0;
                var IntLen = integerNum.length;
                for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            chineseStr += cnNums[0];
                        }
                        //归零
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                }
                chineseStr += cnIntLast;
            }
            //小数部分
            if (decimalNum != '') {
                var decLen = decimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (chineseStr == '') {
                chineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (decimalNum == '') {
                chineseStr += cnInteger;
            }
            return chineseStr;
        }
        // 求和

    }, {
        key: 'funcSum',
        value: function funcSum() {
            var _ref3;

            for (var _len3 = arguments.length, values = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                values[_key3] = arguments[_key3];
            }

            values = (_ref3 = []).concat.apply(_ref3, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return 0;
            }
            values = replaceNullParam(values);
            // 类型检查
            checkValueType('number', 'SUM', 0, values);
            return values.reduce(function (pre, next) {
                return (0, _parseFloat2.default)(pre).add((0, _parseFloat2.default)(next));
            });
        }
        // 满足条件的情况下再求和

    }, {
        key: 'funcSumIf',
        value: function funcSumIf(base, compare, values) {
            // 如果values为空或者判定条件为空
            if ((0, _util.isNullOrUndefined)(base) || (0, _util.isNullOrUndefined)(values) || base.length === 0 || values.length === 0) {
                return 0;
            }
            // 需要求和的值，如果有空字符串，null或者undefined，直接赋值为0
            values.forEach(function (v, index) {
                if ((0, _util.isNullOrUndefined)(v) || v === "") {
                    values.splice(index, 1, 0);
                }
            });
            // 类型检查
            checkValueType('number', 'SUMIF', 2, values);
            // compare传递的是一个数组时，对数组中每一个值求对比结果
            if (!(0, _util.isNullOrUndefined)(compare) && compare.constructor.name === 'Array') {
                var result = [];
                compare.forEach(function (compareVal) {
                    var tmpResult = 0;
                    base.forEach(function (baseVal, index) {
                        if (baseVal === compareVal && index < values.length) {
                            // tmpResult += values[index];
                            tmpResult = tmpResult.add(values[index]);
                        }
                    });
                    result.push(tmpResult);
                });
                return result;
            } else {
                var _result = 0;
                base.forEach(function (baseVal, index) {
                    if (baseVal === compare && index < values.length) {
                        // result += values[index];
                        _result = _result.add(values[index]);
                    }
                });
                return _result;
            }
        }

        // 平均数

    }, {
        key: 'funcAverage',
        value: function funcAverage() {
            var _ref4;

            for (var _len4 = arguments.length, values = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                values[_key4] = arguments[_key4];
            }

            values = (_ref4 = []).concat.apply(_ref4, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return 0;
            }
            values = replaceNullParam(values);
            // 类型检查
            checkValueType('number', 'AVERAGE', 0, values);
            var sum = values.reduce(function (pre, next) {
                //   return Number.parseFloat(pre) + Number.parseFloat(next);
                return (0, _parseFloat2.default)(pre).add((0, _parseFloat2.default)(next));
            });
            //   return sum / values.length;
            return sum.div(values.length);
        }
        // 计数

    }, {
        key: 'funcCount',
        value: function funcCount() {
            var _ref5;

            for (var _len5 = arguments.length, values = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                values[_key5] = arguments[_key5];
            }

            values = (_ref5 = []).concat.apply(_ref5, (0, _toConsumableArray3.default)(values)); // flat
            values = removeNullParam(values);
            return values.length;
        }
        // 最小值

    }, {
        key: 'funcMin',
        value: function funcMin() {
            var _ref6;

            for (var _len6 = arguments.length, values = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                values[_key6] = arguments[_key6];
            }

            values = (_ref6 = []).concat.apply(_ref6, (0, _toConsumableArray3.default)(values)); // flat
            values = removeNullParam(values);
            // 类型检查
            checkValueType('number', 'MIN', 0, values);
            var min = Number.MAX_VALUE;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (0, _getIterator3.default)(values), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var v = _step.value;

                    if (min > v) {
                        min = v;
                    }
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

            return min;
        }
        // 最大值

    }, {
        key: 'funcMax',
        value: function funcMax() {
            var _ref7;

            for (var _len7 = arguments.length, values = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                values[_key7] = arguments[_key7];
            }

            values = (_ref7 = []).concat.apply(_ref7, (0, _toConsumableArray3.default)(values)); // flat
            values = removeNullParam(values);
            // 类型检查
            checkValueType('number', 'MAX', 0, values);
            var max = Number.MIN_VALUE;
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = (0, _getIterator3.default)(values), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var v = _step2.value;

                    if (max < v) {
                        max = v;
                    }
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

            return max;
        }
        // 四舍五入

    }, {
        key: 'funcRound',
        value: function funcRound(value, n) {
            checkParamCount('ROUND', 2, arguments);
            checkValueType('number', 'ROUND', 0, value, n);
            return Number(value).toFixed(n);
        }

        // 向上取，保留n位小数

    }, {
        key: 'funcRoundUp',
        value: function funcRoundUp(value, n) {
            checkParamCount('ROUNDUP', 2, arguments);
            checkValueType('number', 'ROUNDUP', 0, value, n);
            var pow = Math.pow(10, n > value.decimalCnt() ? value.decimalCnt() : n);
            return Math.ceil(value * pow) / pow;
        }

        // 向下取，保留n位小数

    }, {
        key: 'funcRoundDown',
        value: function funcRoundDown(value, n) {
            checkParamCount('ROUNDDOWN', 2, arguments);
            checkValueType('number', 'ROUNDDOWN', 0, value, n);
            var pow = Math.pow(10, n > value.decimalCnt() ? value.decimalCnt() : n);
            return Math.floor(value * pow) / pow;
        }

        // 取整数

    }, {
        key: 'funcInt',
        value: function funcInt(value) {
            checkValueType('number', 'INT', 0, value);
            checkParamCount('INT', 1, arguments);
            return Math.floor(value);
        }
        // 取余（mod操作）

    }, {
        key: 'funcMod',
        value: function funcMod(value, divisor) {
            checkValueType('number', 'MOD', 0, value, divisor);
            checkParamCount('MOD', 2, arguments);
            return (0, _parseInt2.default)(value) % (0, _parseInt2.default)(divisor);
        }
        // 连乘（product是office里面的称呼）

    }, {
        key: 'funcProduct',
        value: function funcProduct() {
            var _ref8;

            for (var _len8 = arguments.length, values = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                values[_key8] = arguments[_key8];
            }

            values = (_ref8 = []).concat.apply(_ref8, (0, _toConsumableArray3.default)(values)); // flat
            values = replaceNullParam(values);
            // 类型检查
            checkValueType('number', 'PRODUCT', 0, values);
            var result = 1;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(values), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var v = _step3.value;

                    //   result *= Number.parseFloat(v);
                    result = result.mul((0, _parseFloat2.default)(v));
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

            return result;
        }
        // 对应相乘后相加

    }, {
        key: 'funcSumProduct',
        value: function funcSumProduct(value1, value2) {
            var result = 0;
            // 获取两个数组的最小长度
            var length = value1.length < value2.length ? value1.length : value2.length;
            for (var index = 0; index < length; index++) {
                //   result += value1[index] * value2[index];
                result = result.add(value1[index].mul(value2[index]));
            }
            return result;
        }
        // 对number求power次方

    }, {
        key: 'funcPower',
        value: function funcPower(number, power) {
            checkValueType('number', 'POWER', 0, number, power);
            return Math.pow(number, power);
        }
        // 拿到年份

    }, {
        key: 'funcYear',
        value: function funcYear(value) {
            checkParamCount('YEAR', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.year();
        }
        // 拿到月份：注意，用moment拿月份时，是从0~11来计算的

    }, {
        key: 'funcMonth',
        value: function funcMonth(value) {
            checkParamCount('MONTH', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.month() + 1;
        }
        // 拿到月份中的day

    }, {
        key: 'funcDay',
        value: function funcDay(value) {
            checkParamCount('DAY', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.date();
        }
        // 时

    }, {
        key: 'funcHour',
        value: function funcHour(value) {
            checkParamCount('HOUR', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.hour();
        }
        // 分

    }, {
        key: 'funcMinite',
        value: function funcMinite(value) {
            checkParamCount('MINITE', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.minute();
        }
        // 秒

    }, {
        key: 'funcSecond',
        value: function funcSecond(value) {
            checkParamCount('SECOND', 1, arguments);
            var t = moment(value, ['YYYY-MM-DD', 'YYYY-MM-DD HH:mm:ss']);
            return t.second();
        }
        // 组装出日期，时分秒如果没有传递，替换成00

    }, {
        key: 'funcDate',
        value: function funcDate(Y, M, D, H, m, s) {
            var t = moment();
            t.year((0, _parseInt2.default)(Y));
            t.month((0, _parseInt2.default)(M) - 1);
            t.date((0, _parseInt2.default)(D));
            t.hour((0, _parseInt2.default)(H ? H : 0));
            t.minute((0, _parseInt2.default)(m ? m : 0));
            t.second((0, _parseInt2.default)(s ? s : 0));
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

        // 把字符串中英文字符转换成大写

    }, {
        key: 'funcUpper',
        value: function funcUpper(value) {
            checkParamCount('UPPER', 1, arguments);
            return value.toString().toUpperCase();
        }

        // 把字符串中英文字符转换成小写

    }, {
        key: 'funcLower',
        value: function funcLower(value) {
            checkParamCount('LOWER', 1, arguments);
            return value.toString().toLowerCase();
        }

        // 与操作

    }, {
        key: 'funcAnd',
        value: function funcAnd() {
            var _ref9;

            for (var _len9 = arguments.length, values = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                values[_key9] = arguments[_key9];
            }

            values = (_ref9 = []).concat.apply(_ref9, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return true;
            }
            // 类型检查
            checkValueType('boolean', 'AND', 0, values);
            return values.filter(function (val) {
                return val === true;
            }).length === values.length;
        }

        // 或操作

    }, {
        key: 'funcOr',
        value: function funcOr() {
            var _ref10;

            for (var _len10 = arguments.length, values = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                values[_key10] = arguments[_key10];
            }

            values = (_ref10 = []).concat.apply(_ref10, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return true;
            }
            // 类型检查
            checkValueType('boolean', 'OR', 0, values);
            return !!values.find(function (val) {
                return val === true;
            });
        }
        // 非操作

    }, {
        key: 'funcNot',
        value: function funcNot(value) {
            // 类型检查
            checkValueType('boolean', 'NOT', 0, value);
            checkParamCount('NOT', 1, arguments);
            return !value;
        }
        // 异或操作

    }, {
        key: 'funcXor',
        value: function funcXor(value1, value2) {
            // 类型检查
            checkValueType('boolean', 'XOR', 0, value1, value2);
            checkParamCount('XOR', 2, arguments);
            return value1 ^ value2 ? true : false;
        }

        // 检查传入的值是否为空

    }, {
        key: 'funcIsEmpty',
        value: function funcIsEmpty(value) {
            if ((0, _util.isNullOrUndefined)(value) || value === "" || value.constructor.name === 'Array' && value === []) {
                return true;
            }
            return false;
        }

        // 查找字符串,在targetText中查找searchText所在位置，返回出现位置索引，没找到返回0,beginPos为开始查找的位置

    }, {
        key: 'funcSearch',
        value: function funcSearch(searchText, targetText, beginPos) {
            if (!beginPos) {
                beginPos = 1;
            }
            checkValueType('number', 'SEARCH', 2, beginPos);
            checkParamCount('SEARCH', 3, arguments);
            return String(targetText).indexOf(String(searchText), beginPos - 1) + 1;
        }

        // 获取字符串的长度

    }, {
        key: 'funcLen',
        value: function funcLen(value) {
            checkParamCount('LEN', 1, arguments);
            return String(value).length;
        }

        // 计算end和start之间相差的天数

    }, {
        key: 'funcDays',
        value: function funcDays(end, start) {
            checkParamCount('DAYS', 2, arguments);
            return moment.duration(moment(end).unix() - moment(start).unix()).asDays() * 1000;
        }

        // 计算出date增加或减少days天的日期（days可以为正数/负数）

    }, {
        key: 'funcDateDelta',
        value: function funcDateDelta(date, days) {
            checkValueType('number', 'DATEDELTA', 1, days);
            checkParamCount('DATEDELTA', 2, arguments);
            return moment(date).add(days, 'days').format("YYYY-MM-DD HH:mm:ss");
        }

        // 获取用户名，根据工作区备注>昵称>邮箱的优先级返回用户的用户名

    }, {
        key: 'funcGetUserName',
        value: function funcGetUserName(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            if (params['alias']) {
                return params['alias'];
            }
            if (params['nickName']) {
                return params['nickName'];
            }
            if (params['email']) {
                return params['email'];
            }
            return "";
        }

        // 返回用户的邮箱

    }, {
        key: 'funcGetUserEmail',
        value: function funcGetUserEmail(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            return params['email'];
        }

        // 获取ja学工号

    }, {
        key: 'funJAaId',
        value: function funJAaId(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            return params['jaInfo']['sid'] ? params['jaInfo']['sid'] : "";
        }

        // 获取ja姓名

    }, {
        key: 'funJaName',
        value: function funJaName(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            if (params['nickName']) {
                return params['nickName'];
            }
            if (params['alias']) {
                return params['alias'];
            }
            if (params['email']) {
                return params['email'];
            }
            return "";
        }

        // 获取ja用户类型

    }, {
        key: 'funJaType',
        value: function funJaType(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            var userType = params['jaInfo']['userType'];
            switch (userType) {
                case "student":
                    return "学生";
                case "schoolFellow":
                    return "校友";
                case "faculty":
                    return "教职工";
                case "postphd":
                    return "博士后";
                case "team":
                    return "集体账号";
                default:
                    return "其他";
            }
        }

        // 获取ja学院ID

    }, {
        key: 'funJaDeptId',
        value: function funJaDeptId(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            return params['jaInfo']['organizeId'];
        }

        // 获取ja学院名称

    }, {
        key: 'funJaDeptName',
        value: function funJaDeptName(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return '';
            }
            return params['jaInfo']['organize'];
        }

        // 获取表单打开次数

    }, {
        key: 'funcRecno',
        value: function funcRecno(params) {
            if ((0, _util.isNullOrUndefined)(params)) {
                return 0;
            }
            return params['openCount'];
        }
    }]);
    return Function;
}();