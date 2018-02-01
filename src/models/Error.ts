export class Error1 {
  errCode: number;
  constructor(data: any) {
    // this.errCode = data.errCode;  // 错误码，1:参数类型错误
    // this.funcName = data.funcName;  // 出错方法名称
    // this.paramIdx = data.paramIdx;  // 类型错误参数索引，从0开始
  }
}