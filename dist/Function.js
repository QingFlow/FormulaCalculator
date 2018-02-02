'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Function = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkValueType = require('./Utils').checkValueType;
var reverse = require('./Utils').reverse;
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
            checkValueType('boolean', 'IF', test);
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
            checkValueType('number', 'LEFT', n);
            value = String(value);
            return value.substr(0, n);
        }
        // 取右边的n个数

    }, {
        key: 'funcRight',
        value: function funcRight(value, n) {
            checkValueType('number', 'RIGHT', n);
            return reverse(reverse(value).substr(0, n));
        }
        // 取代从start开始的长度为n的位置的字符串（注意，用户使用时，第一个位置是1，而不是0）

    }, {
        key: 'funcReplace',
        value: function funcReplace(value, start, n, newValue) {
            value = String(value);
            newValue = String(newValue);
            checkValueType('number', 'REPLACE', start, n);
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
        value: function funNum(value) {
            return (0, _parseFloat2.default)(value);
        }
        // 求和

    }, {
        key: 'funcSum',
        value: function funcSum() {
            var _ref2;

            for (var _len2 = arguments.length, values = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                values[_key2] = arguments[_key2];
            }

            values = (_ref2 = []).concat.apply(_ref2, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return 0;
            }
            // 类型检查
            checkValueType('number', 'SUM', values);
            return values.reduce(function (pre, next) {
                return (0, _parseFloat2.default)(pre) + (0, _parseFloat2.default)(next);
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

            values = (_ref3 = []).concat.apply(_ref3, (0, _toConsumableArray3.default)(values)); // flat
            // 如果没有值的话，返回0
            if (values.length === 0) {
                return 0;
            }
            // 类型检查
            checkValueType('number', 'AVERAGE', values);
            var sum = values.reduce(function (pre, next) {
                return (0, _parseFloat2.default)(pre) + (0, _parseFloat2.default)(next);
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

            values = (_ref4 = []).concat.apply(_ref4, (0, _toConsumableArray3.default)(values)); // flat
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

            values = (_ref5 = []).concat.apply(_ref5, (0, _toConsumableArray3.default)(values)); // flat
            // 类型检查
            checkValueType('number', 'MIN', values);
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
            var _ref6;

            for (var _len6 = arguments.length, values = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                values[_key6] = arguments[_key6];
            }

            values = (_ref6 = []).concat.apply(_ref6, (0, _toConsumableArray3.default)(values)); // flat
            // 类型检查
            checkValueType('number', 'MAX', values);
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
            checkValueType('number', 'ROUND', value, n);
            var iterValue = 1;
            for (var i = 0; i < n; i++) {
                iterValue = 10 * iterValue;
            }
            return Math.round(value * iterValue) / iterValue;
        }
        // 取整数

    }, {
        key: 'funcInt',
        value: function funcInt(value) {
            checkValueType('number', 'INT', value);
            return Math.floor(value);
        }
        // 取余（mod操作）

    }, {
        key: 'funcMod',
        value: function funcMod(value, divisor) {
            checkValueType('number', 'MOD', value, divisor);
            return (0, _parseInt2.default)(value) % (0, _parseInt2.default)(divisor);
        }
        // 连乘（product是office里面的称呼）

    }, {
        key: 'funcProduct',
        value: function funcProduct() {
            var _ref7;

            for (var _len7 = arguments.length, values = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                values[_key7] = arguments[_key7];
            }

            values = (_ref7 = []).concat.apply(_ref7, (0, _toConsumableArray3.default)(values)); // flat
            // 类型检查
            checkValueType('number', 'PRODUCT', values);
            var result = 1;
            var _iteratorNormalCompletion3 = true;
            var _didIteratorError3 = false;
            var _iteratorError3 = undefined;

            try {
                for (var _iterator3 = (0, _getIterator3.default)(values), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                    var v = _step3.value;

                    result *= (0, _parseFloat2.default)(v);
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
        // 连乘后相加

    }, {
        key: 'funcSumProduct',
        value: function funcSumProduct() {
            var result = 0;

            for (var _len8 = arguments.length, values = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                values[_key8] = arguments[_key8];
            }

            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
                for (var _iterator4 = (0, _getIterator3.default)(values), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                    var v = _step4.value;

                    // 数组
                    if ((typeof v === 'undefined' ? 'undefined' : (0, _typeof3.default)(v)) === 'object') {
                        var r2 = 1;
                        var _iteratorNormalCompletion5 = true;
                        var _didIteratorError5 = false;
                        var _iteratorError5 = undefined;

                        try {
                            for (var _iterator5 = (0, _getIterator3.default)(v), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                var v2 = _step5.value;

                                r2 *= (0, _parseFloat2.default)(v2);
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

                        result += r2;
                    }
                    // 普通数字
                    else {
                            result += (0, _parseFloat2.default)(v);
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
            return value.toString().toUpperCase();
        }

        // 把字符串中英文字符转换成小写

    }, {
        key: 'funcLower',
        value: function funcLower(value) {
            return value.toString().toLowerCase();
        }

        // 与操作

    }, {
        key: 'funcAnd',
        value: function funcAnd(value1, value2) {
            // 类型检查
            checkValueType('boolean', 'AND', value1, value2);
            return value1 && value2;
        }

        // 或操作

    }, {
        key: 'funcOr',
        value: function funcOr(value1, value2) {
            // 类型检查
            checkValueType('boolean', 'OR', value1, value2);
            return value1 || value2;
        }
        // 非操作

    }, {
        key: 'funcNot',
        value: function funcNot(value) {
            // 类型检查
            checkValueType('boolean', 'NOT', value);
            return !value;
        }
        // 异或操作

    }, {
        key: 'funcXor',
        value: function funcXor(value1, value2) {
            // 类型检查
            checkValueType('boolean', 'XOR', value1, value2);
            return value1 ^ value2 ? true : false;
        }

        // 检查传入的值是否为空

    }, {
        key: 'funcIsEmpty',
        value: function funcIsEmpty(value) {
            if (value === undefined || value === "" || (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object' && value.length === 0) {
                return true;
            }
            return false;
        }

        // 查找字符串,在targetText中查找searchText所在位置，返回出现位置索引，没找到返回0,beginPos为开始查找的位置

    }, {
        key: 'funcSearch',
        value: function funcSearch(searchText, targetText, beginPos) {
            if (!beginPos) {
                beginPos = 0;
            }
            checkValueType('number', 'SEARCH', beginPos);
            return String(targetText).indexOf(String(searchText), beginPos) + 1;
        }

        // 获取字符串的长度

    }, {
        key: 'funcLen',
        value: function funcLen(value) {
            return String(value).length;
        }

        // 计算end和start之间相差的天数

    }, {
        key: 'funcDays',
        value: function funcDays(end, start) {
            return moment.duration(moment(end).unix() - moment(start).unix()).asDays() * 1000;
        }

        // 计算出date增加或减少days天的日期（days可以为正数/负数）

    }, {
        key: 'funcDateDelta',
        value: function funcDateDelta(date, days) {
            checkValueType('number', 'DATEDELTA', days);
            return moment(date).add(days, 'days').format("YYYY-MM-DD HH:mm:ss");
        }

        // 获取用户名，根据工作区备注>昵称>邮箱的优先级返回用户的用户名

    }, {
        key: 'funcGetUserName',
        value: function funcGetUserName(params) {
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
            return params['email'];
        }

        // 获取ja学工号

    }, {
        key: 'funJAaId',
        value: function funJAaId(params) {
            return params['jaInfo']['sid'] ? params['jaInfo']['sid'] : "";
        }

        // 获取ja姓名

    }, {
        key: 'funJaName',
        value: function funJaName(params) {
            return params['jaInfo']['name'] ? params['jaInfo']['name'] : "";
        }

        // 获取ja用户类型

    }, {
        key: 'funJaType',
        value: function funJaType(params) {
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
            return params['jaInfo']['organizeId'];
        }

        // 获取ja学院名称

    }, {
        key: 'funJaDeptName',
        value: function funJaDeptName(params) {
            return params['jaInfo']['organize'];
        }

        // 获取表单打开次数

    }, {
        key: 'funcRecno',
        value: function funcRecno(params) {
            return params['openCount'];
        }
    }]);
    return Function;
}();