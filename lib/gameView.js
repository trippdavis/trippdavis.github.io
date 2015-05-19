(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
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
      if ($(event.target).attr("id") === "game-canvas") {
        this.onCanvas = true;
      } else {
        this.onCanvas = false;
      }
    }.bind(this));
  };

  GameView.prototype.startGame = function () {
    this.game = new Asteroids.Game();
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
    this.start();
  };
})();
