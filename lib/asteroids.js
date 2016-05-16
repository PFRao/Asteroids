var GameView = require("./gameView.js");

var canvasEl = document.getElementById("game-canvas");
var ctx = canvasEl.getContext("2d");

// game = new Game();
gameView = new GameView(ctx);
gameView.start();
