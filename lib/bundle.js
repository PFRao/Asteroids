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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Asteroid = __webpack_require__(3);
	var Ship = __webpack_require__(6);
	var Bullet = __webpack_require__(7);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

	function MovingObject (options) {
	  this.pos = options.pos;
	  this.vel = options.vel;
	  this.radius = options.radius;
	  this.color = options.color;
	  this.game = options.game;
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
	  this.pos = this.game.wrap(this, this.pos);
	};

	MovingObject.prototype.isWrappable = function () {
	  return true;
	};

	MovingObject.prototype.isCollidedWith = function(otherObject) {
	  var sumRadii = this.radius + otherObject.radius;
	  var distance = Math.sqrt(
	    Math.pow((this.pos[0]-otherObject.pos[0]), 2) +
	    Math.pow((this.pos[1]-otherObject.pos[1]), 2)
	  );
	  return sumRadii >= distance ? true : false;
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(4);
	var Bullet = __webpack_require__(7);
	var Util = __webpack_require__(5);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(4);
	var Util = __webpack_require__(5);

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


/***/ }
/******/ ]);