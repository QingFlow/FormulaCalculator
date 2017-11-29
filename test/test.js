var calc = require('../index');

try {
  let params = {
    jaInfo: {
      sid: "1140379009", 
      organize: "软件学院",
      organizeId: "03700",
      userType: "student"
    }, 
    userInfo: {
      wsRemark: '工作区备注', 
      email: 'exiao'
    }
  }
  let a = calc.calculate('CONCAT(JAID(), "asdasd")', params);
  console.log(a);
  console.log(calc.calculate('JANAME()', params));
  console.log(calc.calculate('JATYPE()', params));
  console.log(calc.calculate('JADEPTID()', params));
  console.log(calc.calculate('JADEPTNAME()', params));
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

