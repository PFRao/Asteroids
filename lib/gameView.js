var Game = require("./game.js");

function GameView (ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  setInterval(function () {
    this.game.moveObjects();
    this.game.draw(this.ctx);
  }.bind(this), 20);
  // setInterval(this.game.draw.bind(this.game), 20, this.ctx);

};

module.exports = GameView;
