var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

function Asteroid (option) {
  var attr = {
    pos: option.pos,
    vel: Util.randomVec(),
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS
  };
  MovingObject.call(this, attr);
}

Asteroid.COLOR = '#FFC0CB';
Asteroid.RADIUS = 40;

Util.inherits(Asteroid, MovingObject);
module.exports = Asteroid;
