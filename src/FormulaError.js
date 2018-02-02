
/**
 * 公式错误类型
 * @todo 错误类型等待完善，现在只需要抛出错误就可以了
 */
class FormulaError {
  constructor(data) {
    this.errCode = data.errCode;  // 错误码，1:参数类型错误
    this.funcName = data.funcName;  // 出错方法名称
    this.paramIdx = data.paramIdx;  // 类型错误参数索引，从0开始
    this.expectNum = data.expectNum;  // 正确情况下参数个数
    this.actualNum = data.actualNum;  // 实际参数个数
  }
}

module.exports.FormulaError = FormulaError;