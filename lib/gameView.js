(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var GameView = Asteroids.GameView = function (ctx) {
    this.ctx = ctx;
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
    this.game = new Asteroids.Game();

    this.gameIntervalID = window.setInterval((function () {
      if (this.game.over) {
        this.gameOver();
      } else {
        this.game.step();
        this.game.draw(this.ctx);
        this.bindKeyHandlers();
      }
    }).bind(this), 20);
  };

  GameView.prototype.gameOver = function () {
    clearInterval(this.gameIntervalID);
    this.start();
  };
})();
