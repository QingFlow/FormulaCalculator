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

- IF
- CONCAT
- LEFT
- REPLACE
- MID
- TEXT
- SUM
- AVERAGE
- COUNT
- MIN
- MAX
- ROUND
- INT
- MOD
- PRODUCT
- SUMPRODUCT
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
- GETUSERNAME
- GETUSEREMAIL
- UPPER
- LOWER
// 以下是新增的方法
- AND
- OR
- NOT
- XOR
- ISEMPTY
- SEARCH
- RIGHT

#### Ja相关的方法

- JAID  (获取ja学工号)
- JANAME  （获取ja姓名）
- JATYPE  （获取ja用户类型）
- JADEPTID  （获取ja部门id）
- JADEPTNAME  （获取ja部门名称）
> 调用方法不一样,需要传递用户信息进来：calculate('JAID()', params)
> params数据结构: 
```javascript
{
  email: "",  // 用户邮箱
  nickName: "",  // 用户的昵称
  alias: "",  // 用户在工作区的备注名称
  jaInfo: {
    sid: "11134456666", 
    organize: "03728",
    organizeId: "organizeId",
    userType: "student|schoolFellow|faculty|postphd|team",
    name: "姓名"
  }
}
```

### 规则

1. 字符串要用双引号包裹

###

1. 打补丁： npm version patch , npm publish


### 错误码说明
抛出的错误结构为

```
{
  "errCode": 1,  // 错误码
  "funcName": "SUM",  // 发生错误方法/操作符名称
  "paramIdx": 0,  // 错误参数索引，从0开始
}
```

错误码说明
- 1: 参数类型错误