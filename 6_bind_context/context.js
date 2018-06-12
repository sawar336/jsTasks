function bind(fn, ctx) {
  return function () {
      return fn.apply(ctx, arguments);
  }
}

var ctx = {x: 2};
var ctx2 = {x: 8};

function testThis(a) {
  console.log('x=' + this.x);
  console.log('a=' + a);
}

var boundFunction = bind(testThis, ctx);
var boundFunction2 = bind(testThis, ctx2);
boundFunction(100); 
boundFunction2(800); 
