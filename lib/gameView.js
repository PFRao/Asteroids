var Game = require("./game.js");

function GameView (ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(function () {
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
  this.bindKeyHandlers();
};

GameView.prototype.bindKeyHandlers = function () {
  var that = this;

  key('up', function(){ that.game.ship.fireBullet([0, -10]); });
  key('down', function(){ that.game.ship.fireBullet([0, 10]); });
  key('left', function(){ that.game.ship.fireBullet([-10, 0]); });
  key('right', function(){ that.game.ship.fireBullet([10, 0]); });

  key('w', function(){ that.game.ship.power([0, -1]); });
  key('s', function(){ that.game.ship.power([0, 1]); });
  key('a', function(){ that.game.ship.power([-1, 0]); });
  key('d', function(){ that.game.ship.power([1, 0]); });

  // key('space', function(){
  //   if (that.game.bullets.length === 0) {
  //     that.game.ship.fireBullet();
  //   }
  // });
};

module.exports = GameView;
