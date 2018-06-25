var calculate = require('../dist/Calculator');

var calc = require('../index');
var moment = require('moment');

var start = "2018-02-02 12:12:12";
var end = "2018-02-03 12:12:12";
var result = moment.duration(moment(end).unix() - moment(start).unix()).asDays() * 1000;
// console.log(result);

try {
  let params = {
    email: "邮箱",
    nickName: "昵称",
    alias: "备注",
    openCount: 11,  // 表单打开次数
    jaInfo: {
      sid: "1140379009", 
      organize: "软件学院",
      organizeId: "03700",
      userType: "student",
      name: "姓名"
    }
  }
  let a = { email: "13402171010@126.com", nickName: "李婷婷", alias: "这是134的备注" };
  // console.log(calc.calculate('SUM(NUM("3","4","3","4"))'));
  // console.log(calc.calculate('SUM(NUM("3"))'));
  // console.log(calc.calculate('[2,6,0]<[3,7,3]'));
  console.log(calc.calculate('IF("请假半天"=="请假一天",0,1)'));
  // console.log(calc.calculate('null-2'));
  // console.log(calc.calculate('null+2'));
  // console.log(calc.calculate('[199, 199]-[251, 251]'));
  // console.log(calc.calculate('[2,2]-3'));
  // console.log(calc.calculate('2-[3,4]'));
  // console.log(calc.calculate('2-3'));
  // console.log(calc.calculate('2-null'));
  // console.log(calc.calculate('null-3'));
  // console.log(b.mul(0.3))
  // let a = calc.calculate('CONCAT(JAID(), "asdasd")', params);
  // console.log(a);
  // console.log(calc.calculate('JANAME()', params));
  // console.log(calc.calculate('JATYPE()', params));
  // console.log(calc.calculate('JADEPTID()', params));
  // console.log(calc.calculate('JADEPTNAME()', params));
  // console.log(calc.calculate('CONCAT(GETUSERNAME(), GETUSEREMAIL())', params));
  // console.log(calc.calculate('UPPER("ss看见阿斯顿好.,ssmin11")'));
  // console.log(calc.calculate('LOWER("ss看见JHUHU阿斯顿好.,ssmin11")'));
  // console.log(calc.calculate('REPLACE("今天是星期日，好开心", SEARCH("星期日","今天是星期日，好开心"), 3, "星期一")'));
  // console.log(calc.calculate('RIGHT("hellossss", 6)'))
  // console.log(calc.calculate('LEN("hellossss")'))
  // console.log(calc.calculate('TEXT("2018-02-04 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-05 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-06 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-07 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-01 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-02 12:12:12", "E")'));
  // console.log(calc.calculate('TEXT("2018-02-03 12:12:12", "E")'));
  
  // console.log(calc.calculate('TEXT("2018-02-04 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-05 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-06 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-07 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-01 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-02 12:12:12", "EE")'));
  // console.log(calc.calculate('TEXT("2018-02-03 12:12:12", "EE")'));
  // console.log(calc.calculate('DATEDELTA("2018-02-01", -3)'));
  // console.log(calc.calculate('DATEDELTA("2018-02-01", 3)'));
  // console.log(calc.calculate('DAYS("2018-01-04 12:12:12", "2018-02-02 12:12:12")'));
  // console.log(calc.calculate('RECNO()', params))
  // console.log(calc.calculate('LEFT("hello world","sdds")'));
  // console.log(calc.calculate('IF("a"="s","ss")'))
  // console.log(calc.calculate('SEARCH("aa","haaeekjaa", 2)'))
  // console.log(calc.calculate(`COUNT("sad", "a")`));
  // console.log(calc.calculate('POWER(2,1/4)'))
  // console.log(calc.calculate('SUMIF([1,2,3],[1,2,3],[1,"", null])'))
  // console.log(calc.calculate('IF(ISEMPTY(null),"aaa","bbb")'))
  // console.log(calc.calculate('ISEMPTY(undefined)'));
  // console.log(calc.calculate('ROUND(12,2)'));
  // console.log(calc.calculate('COUNT([1,2,null,3])'));
  // console.log(calc.calculate('RMBUPPER(1000)'));
}
catch(err) {
  console.log(err);
}

