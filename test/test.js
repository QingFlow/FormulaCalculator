var calc = require('../index');

try {
  // calc.calculate("1+'s'");
  // let a = calc.calculate('"ss" and false');
  let a = calc.calculate('MAX(1,2,23434)');
  // let a = calc.calculate('...');
  console.log(a);
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

