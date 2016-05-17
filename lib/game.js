var Asteroid = require("./asteroid.js");
var Ship = require("./ship.js");
var Bullet = require("./bullet.js");

function Game() {
  this.asteroids = [];
  this.bullets = [];
  this.ship = new Ship({pos: this.randomPosition(), game: this});

  this.addAsteroids();
}

Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: this.randomPosition(), game: this}));
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.allObjects().forEach(function (thing) {
    thing.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.allObjects().forEach(function (thing) {
    thing.move();
  });
};

Game.prototype.wrap = function (thing, pos) {

  if (pos[0] > 800) {
    if (thing.isWrappable() === false) { this.removeBullet(thing); }
    pos[0] = pos[0] - 800;
  } else if (pos[0] < 0) {
    if (thing.isWrappable() === false) { this.removeBullet(thing); }
    pos[0] = 800 + pos[0];
  }

  if (pos[1] > 600) {
    if (thing.isWrappable() === false) { this.removeBullet(thing); }
    pos[1] = pos[1] - 600;
  } else if (pos[1] < 0) {
    if (thing.isWrappable() === false) { this.removeBullet(thing); }
    pos[1] = 600 + pos[1];
  }
  return pos;
};

Game.prototype.randomPosition = function() {
  var xPos = Math.random() * (Game.DIM_X);
  var yPos = Math.random() * (Game.DIM_Y);
  return [xPos, yPos];
};

Game.prototype.checkCollisions = function() {
  for (var i = 0; i < this.allObjects().length; i++) {
    thingOne = this.allObjects()[i];
    for (var j = i + 1; j < this.allObjects().length; j++) {
      thingTwo = this.allObjects()[j];
      if (thingOne.isCollidedWith(thingTwo)){
        thingOne.collideWith(thingTwo);
      }
    }
  }
};

Game.prototype.removeAsteroid = function (asteroid) {
  var index = this.asteroids.indexOf(asteroid);
  this.asteroids.splice(index, 1);
};

Game.prototype.removeBullet = function (asteroid) {
  var index = this.bullets.indexOf(asteroid);
  this.bullets.splice(index, 1);
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.allObjects = function () {
  var heartyLaugh = this.asteroids.concat([this.ship]);
  heartyLaugh2 = this.bullets.concat(heartyLaugh);
  return heartyLaugh2;
};

module.exports = Game;
