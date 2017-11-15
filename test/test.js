'use strict';

var calc = require('../index');

// console.log(calc.calculate("SUM(1,'a')"));
try {
  // console.log(calc.calculate("1+'s'"));
  calc.calculate("1+'s'")
}
catch(err) {
  console.log('inside err');
  console.log(err);
}

