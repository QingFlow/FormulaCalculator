const calc = require('../index');
const chalk = require('chalk');

/**
 * 测试使用方法：命令行运行 npm run calc "公式详情"
 * 例如： npm run calc "SUM(1,2)"
 */
module.exports = function(formula) {
  try {
    // let params = {
    //   email: "邮箱",
    //   nickName: "昵称",
    //   alias: "备注",
    //   openCount: 11,  // 表单打开次数
    //   jaInfo: {
    //     sid: "1140379009", 
    //     organize: "软件学院",
    //     organizeId: "03700",
    //     userType: "student",
    //     name: "姓名"
    //   }
    // }
    // let a = { email: "13402171010@126.com", nickName: "李婷婷", alias: "这是134的备注" };
    const resutl = calc.calculate(formula);
    console.log(chalk.bgGreenBright.black('公式'), chalk.yellow(formula + '\n'));
    console.log(chalk.bgGreenBright.black('结果'), chalk.yellow(resutl));
  }
  catch(err) {
    console.log(err);
  }
}


