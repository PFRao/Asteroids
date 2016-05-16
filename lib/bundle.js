/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var GameView = __webpack_require__(1);

	var canvasEl = document.getElementById("game-canvas");
	var ctx = canvasEl.getContext("2d");

	// game = new Game();
	gameView = new GameView(ctx);
	gameView.start();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(3);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(5);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	}

	MovingObject.prototype.draw = function (ctx) {
	  ctx.fillStyle = this.color;
	  ctx.beginPath();

	  ctx.arc(
	      this.pos[0],
	      this.pos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );

	  ctx.fill();
	};

	MovingObject.prototype.move = function () {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	};


	module.exports = MovingObject;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);