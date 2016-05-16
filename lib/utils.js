var Util = {};

Util.inherits = function (ChildClass, ParentClass) {
  function Surrogate () {}
  Surrogate.prototype = ParentClass.prototype;
  ChildClass.prototype = new Surrogate();
  ChildClass.prototype.constructor = ChildClass;
};

Util.randomVec = function () {
  var base = Math.random() * 20 - 10;
  var height = Math.random() * 20 - 10;
  return [base, height];
};

module.exports = Util;
