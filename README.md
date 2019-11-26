# 公式计算插件，没有任何依赖

> Powered By 轻流

1. 重新生成代码 antlr4 -Dlanguage=JavaScript -no-listener -visitor Formula.g4

### 使用方法

1. npm install formula-calculator --save

2. 需要使用的地方引入

  `import formula from 'formula-calculator';`

3. 调用计算方法

  `console.log(formula.calculate('SUM(1,2,3)'));`

4. 本地调试

  `npm run calc "sum(1, 2)"`

5. 如果有其他需要，可以提交issue

### 支持的公式类型

- IF
- CONCAT
- LEFT
- RIGHT
- REPLACE
- MID
- TEXT
- NUM
- RMBUPPER
- SUM
- SUMIF
- AVERAGE
- COUNT
- COUNTIF
- MIN
- MAX
- ROUND
- ROUNDUP
- ROUNDDOWN
- INT
- MOD
- PRODUCT
- SUMPRODUCT
- POWER
- YEAR
- MONTH
- DAY
- HOUR
- MINUTE
- SECOND
- DATE
- CURDATE
- NOW
- RDID
- UPPER
- LOWER
- AND
- OR
- NOT
- XOR
- ISEMPTY
- SEARCH
- LEN
- DAYS
- DATEDELTA
- REGTEST
- LN
- IFS
- BASE64
- SQRT

公式的具体用法，可参考[轻流公式使用说明](https://hc.qingflow.com/help-center/function2/) 

### 规则

1. 字符串要用双引号包裹
2. 字符串中如果需要包含双引号，进入公式前需要把 \ 替换成 \\，再把 " 替换成\"。公式计算出的结果，会自动去掉转义

### 错误码说明
抛出的错误结构为

参数类型错误：
```
{
  "errCode": 1,  // 错误码
  "funcName": "SUM",  // 发生错误方法/操作符名称
  "paramIdx": 1,  // 错误参数索引，从1开始
}
```

参数个数错误
```
{
  "errCode": 2,
  "funcName": "SUM",  // 参数个数错误方法名称
  "expectNum": 2,  // 正确情况下参数个数
  "actualNum": 3,  // 实际参数个数
}
```

错误码说明
- 1: 参数类型错误
- 2: 参数个数错误
- 3: 计算出的结果不正确