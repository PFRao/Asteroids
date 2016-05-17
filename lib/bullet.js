var MovingObject = require("./movingObject.js");
var Util = require("./utils.js");

function Bullet(option) {
  var attr = {
    pos: option.pos,
    vel: option.vel,
    color: Bullet.COLOR,
    radius: Bullet.RADIUS,
    game: option.game
  };
  MovingObject.call(this, attr);
}

Bullet.COLOR = '#FFFFFF';
Bullet.RADIUS = 3;
Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = function () {
  return false;
};

Bullet.prototype.collideWith = function (otherObject) {
  if (this.game.asteroids.includes(otherObject)) {
    this.game.removeAsteroid(otherObject);
    this.game.removeBullet(this);
    console.log("You shot an asteroid!");
  }
};

module.exports = Bullet;
