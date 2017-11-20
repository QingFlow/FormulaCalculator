var calc = require('../index');

try {
  // calc.calculate("1+'s'");
  // let a = calc.calculate('"ss" and false');
  let a = calc.calculate('SUM(1,2)');
  // let a = calc.calculate('...');
  console.log(a);
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

