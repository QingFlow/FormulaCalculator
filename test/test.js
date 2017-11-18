'use strict';

var calc = require('../index');

try {
  // calc.calculate("1+'s'");
  // let a = calc.calculate('"ss" and false');
  let a = calc.calculate('SUM(1,3 df)');
  console.log(a);
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

