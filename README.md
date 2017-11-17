# 公式计算插件，没有任何依赖

> Powered By 轻流

1. 重新生成代码 antlr4 -Dlanguage=JavaScript -no-listener -visitor Formula.g4

### 使用方法

1. npm install formula-calculator --save

2. 需要使用的地方引入

  `import formula from 'formula-calculator';`

3. 调用计算方法

  `console.log(formula.calculate('SUM(1,2,3)'));`

### 支持的公式类型

IF
CONCAT
LEFT
REPLACE
MID
TEXT
SUM
AVERAGE
COUNT
MIN
MAX
ROUND
INT
MOD
PRODUCT
SUMPRODUCT
YEAR
MONTH
DAY
HOUR
MINUTE
SECOND
DATE
CURDATE
NOW
RDID

### 规则

1. 字符串要用双引号包裹
