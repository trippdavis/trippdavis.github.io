(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function () {
    this.onCanvas = true;
    this.currentGame = false;
  };

  GameView.prototype.bindKeyHandlers = function () {
    if (key.isPressed("up")) {
      this.game.ship.changeSpeed(1);
    }
    if (key.isPressed("down")) {
      this.game.ship.changeSpeed(-1);
    }
    if (key.isPressed("right")) {
      this.game.ship.changeDir(1);
    }
    if (key.isPressed("left")) {
      this.game.ship.changeDir(-1);
    }
    if (key.isPressed("space")) {
      this.game.ship.shootGun();
    }
    if (key.isPressed("1")) {
      this.game.ship.currentGun = "Pistol";
    }
    if (key.isPressed("2")) {
      this.game.ship.currentGun = "Shotgun";
    }
    if (key.isPressed("3")) {
      this.game.ship.currentGun = "Laser";
    }
  };

  GameView.prototype.start = function () {
    $(window).on('keydown', function (event) {
      if (this.onCanvas) {
        event.preventDefault();
        if (event.keyCode === 32 && !(this.currentGame)) {
          this.startGame();
        }
      }
    }.bind(this));

    $(window).on('click', function (event) {
      var gameView = document.getElementsByClassName("game-view")[0];

      if (gameView === event.target || $.contains(gameView, event.target)) {
        this.onCanvas = true;
      } else {
        this.onCanvas = false;
      }
    }.bind(this));
  };

  GameView.prototype.setupCanvas = function () {
    $(".game-view").html("<canvas id='game-canvas' width='800' height='600'></canvas>");
    var canvasEl = document.getElementsByTagName("canvas")[0];
    this.ctx = canvasEl.getContext('2d');
  };

  GameView.prototype.startGame = function () {
    this.setupCanvas();

    this.game = new Asteroids.Game(this.ctx);
    this.currentGame = true;

    this.gameIntervalID = window.setInterval((function () {
      if (this.game.over) {
        this.gameOver();
      } else {
        this.game.step();
        this.game.draw(this.ctx);
        if (this.onCanvas) {
          this.bindKeyHandlers();
        }
      }
    }).bind(this), 20);
  };

  GameView.prototype.gameOver = function () {
    clearInterval(this.gameIntervalID);
    $(".game-view").html("<div class='game-over'><h1>Game Over</h1><h3>Score: " + this.game.score + "<h3>Press space to play again</div>");
    this.currentGame = false;
    this.start();
  };
})();
