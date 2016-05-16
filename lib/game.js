var Asteroid = require("./asteroid.js");
// var Ship = require("./ship.js");
// var Bullet = require("./bullet.js");

function Game() {
  this.asteroids = [];

  this.addAsteroids();
}

Game.DIM_X = 800;
Game.DIM_Y = 600;
Game.ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.ASTEROIDS; i++) {
    this.asteroids.push(new Asteroid({pos: Game.randomPosition()}));
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);

  this.asteroids.forEach(function (asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function (asteroid) {
    asteroid.move();
  });
};

Game.randomPosition = function() {
  var xPos = Math.random() * (Game.DIM_X);
  var yPos = Math.random() * (Game.DIM_Y);
  return [xPos, yPos];
};

module.exports = Game;
