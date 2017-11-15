'use strict';

var calc = require('../index');

try {
  // calc.calculate("1+'s'");
  let a = calc.calculate("true and false");
  console.log(a);
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

