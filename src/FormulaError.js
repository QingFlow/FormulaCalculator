
/**
 * 公式错误类型
 * @todo 错误类型等待完善，现在只需要抛出错误就可以了
 */
class FormulaError {

  constructor(data) {
    this.errCode = data.errCode;
  }
}

module.exports.FormulaError = FormulaError;