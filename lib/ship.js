var MovingObject = require("./movingObject.js");
var Bullet = require("./bullet.js");
var Util = require("./utils.js");

function Ship (option) {
  var attr = {
    pos: option.pos,
    vel: [0, 0],
    color: Ship.COLOR,
    radius: Ship.RADIUS,
    game: option.game
  };
  MovingObject.call(this, attr);
}

Ship.COLOR = '#00FFFF';
Ship.RADIUS = 10;
Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function (func) {
  this.vel = [0,0];
  this.pos = this.game.randomPosition();
};

Ship.prototype.power = function (impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function (dir) {
  if (this.game.bullets.length === 0) {
    var thePos = this.pos;
    var bullet;

    // if (this.vel[0] > 0) { theVel[0] = 10; }
    // if (this.vel[1] > 0) { theVel[1] = 10; }
    // if (this.vel[0] < 0) { theVel[0] = -10; }
    // if (this.vel[1] < 0) { theVel[1] = -10; }
    // if (theVel[0] === 0 && theVel[1] === 0) { return; }

    bullet = new Bullet({pos: thePos, vel: dir, game: this.game});
    console.log(bullet);
    console.log(this);
    this.game.bullets.push(bullet);
  }
};

module.exports = Ship;
