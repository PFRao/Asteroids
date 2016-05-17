var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

function Asteroid (option) {
  var attr = {
    pos: option.pos,
    vel: Util.randomVec(),
    color: Asteroid.COLOR,
    radius: Asteroid.RADIUS,
    game: option.game
  };
  MovingObject.call(this, attr);
}

Asteroid.COLOR = '#FF00FF';
Asteroid.RADIUS = 25;
Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject === this.game.ship) {
    otherObject.relocate();
    console.log("Your ship has been hit!");
  }
};

module.exports = Asteroid;
