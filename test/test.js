'use strict';

var calc = require('../index');

try {
  // calc.calculate("1+'s'");
  // let a = calc.calculate('"ss" and false');
  let a = calc.calculate('DAY("1-2-3-4-5-6")')
  console.log(a);
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

