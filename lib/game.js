(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Game = Asteroids.Game = function () {
    this.score = 0;
    this.over = false;
    this.lives = 3;
    this.dimX = 800;
    this.dimY = 600;
    this.newAsteroidNum = 0.02;
    this.refillNum = 0.005;
    obj = {
      pos: this.randomPosition(),
      game: this
    };
    this.ship = new Asteroids.Ship(obj);
    this.asteroids = [];
    this.bullets = [];
    this.lasers = [];
    this.refills = [];
  };

  Game.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > this.dimX || pos[1] < 0 || pos[1] > this.dimY);
  };

  Game.prototype.allObjects = function () {
    return this.asteroids.concat([this.ship]).concat(this.bullets).concat(this.refills).concat(this.lasers);
  };

  Game.prototype.addAsteroid = function () {
    obj = {
      pos: this.randomEdgePosition(),
      game: this
    };
    var asteroid = new Asteroids.Asteroid(obj);
    this.asteroids.push(asteroid);
  };

  Game.prototype.addRefill = function () {
    var rand = Math.random();
    obj = {
      pos: this.randomPosition(),
      game: this
    };
    if (rand < 0.001) {
      obj.type = "Laser";
    } else if (rand < 0.002) {
      obj.type = "Shotgun";
    } else if (rand < 0.005) {
      obj.type = "Pistol";
    }
    if (obj.type) {
      var refill = new Asteroids.AmmoRefill(obj);
      this.refills.push(refill);
    }
  };

  Game.prototype.randomPosition = function () {
    var posX = Math.floor(Math.random() * this.dimX);
    var posY = Math.floor(Math.random() * this.dimY);
    return [posX, posY];
  };

  Game.prototype.randomEdgePosition = function () {
    var borderPos = Math.floor(Math.random() * 2 * (this.dimX + this.dimY));
    var pos;
    if (borderPos < this.dimX) {
      pos = [borderPos, 0];
    } else if (borderPos < (this.dimX + this.dimY)) {
      pos = [this.dimX, borderPos - this.dimX];
    } else if (borderPos < ((2 * this.dimX) + this.dimY)) {
      pos = [borderPos - this.dimX - this.dimY, this.dimY];
    } else {
      pos = [0, borderPos - (2 * this.dimX) - this.dimY];
    }

    return pos;
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, this.dimX, this.dimY);
    ctx.drawImage(backgroundImg, 0, 0);
    var i;
    for (i = 0; i < this.allObjects().length; i++) {
      this.allObjects()[i].draw(ctx);
    }

    this.showStats();
  };

  Game.prototype.showStats = function () {
    ctx.fillStyle = "white";
    ctx.font = "20pt Arial";
    ctx.fillText("Score: " + this.score, 10, 30);
    ctx.fillText("Lives: " + this.lives, 10, 60);
    ctx.fillText("Gun: " + this.ship.currentGun, 10, 90);
    ctx.fillText("Ammo: " + this.ship.guns[this.ship.currentGun], 10, 120);
  };

  Game.prototype.moveObjects = function () {
    var i = 0;
    this.ship.move();
    while (i < this.asteroids.length) {
      var asteroid = this.asteroids[i];
      asteroid.move();
      if (this.isOutOfBounds(asteroid.pos)) {
        this.asteroids.splice(i, 1);
      } else {
        i += 1;
      }
    }
    i = 0;
    while (i < this.bullets.length) {
      var bullet = this.bullets[i];
      bullet.move();
      if (this.isOutOfBounds(bullet.pos)) {
        this.bullets.splice(i, 1);
      } else {
        i += 1;
      }
    }
    while (i < this.lasers.length) {
      var laser = this.lasers[i];
      laser.move();
      if (this.isOutOfBounds(laser.pos)) {
        this.lasers.splice(i, 1);
      } else {
        i += 1;
      }
    }
  };

  Game.prototype.wrap = function (pos) {
    var posX, posY;
    if (pos[0] >= 0) {
      posX = pos[0] % this.dimX;
    }
    else if (pos[0] < 0) {
      posX = this.dimX + pos[0];
    }
    if (pos[1] >= 0) {
      posY = pos[1] % this.dimY;
    }
    else if (pos[1] < 0) {
      posY = this.dimY + pos[1];
    }

    return [posX, posY];
  };

  Game.prototype.checkCollisions = function () {
    var i = 0;
    while (i < this.asteroids.length) {
      var asteroid = this.asteroids[i];
      if (asteroid.isCollidedWith(this.ship)) {
        this.shipHitAsteroid();
      }
      var j = 0;
      while (j < this.bullets.length && asteroid) {
        if (asteroid.isCollidedWith(this.bullets[j])) {
          this.bulletHitAsteroid(i, j);
          asteroid = false;
        } else {
          j += 1;
        }
      }
      j = 0;
      while (j < this.lasers.length && asteroid) {
        if (this.lasers[j].isCollidedWith(asteroid)) {
          this.laserHitAsteroid(i);
          asteroid = false;
        } else {
          j += 1;
        }
      }

      if (asteroid) {
        i += 1;
      }
    }
    i = 0;
    while (i < this.refills.length) {
      var refill = this.refills[i];
      if (refill.isCollidedWith(this.ship)) {
        this.ship.ammoRefill(refill.type);
        this.refills.splice(i, 1);
      } else {
        i += 1;
      }
    }
  };

  Game.prototype.shipHitAsteroid = function () {
    this.lives -= 1;
    if (this.lives === 0) {
      this.over = true;
    } else {
      this.ship.newLife();
    }
  };

  Game.prototype.bulletHitAsteroid = function (asteroidIdx, bulletIdx) {
    this.score += this.asteroids[asteroidIdx].score;
    this.asteroids.splice(asteroidIdx, 1);
    this.bullets.splice(bulletIdx, 1);
  };

  Game.prototype.laserHitAsteroid = function (asteroidIdx) {
    this.score += this.asteroids[asteroidIdx].score;
    this.asteroids.splice(asteroidIdx, 1);
  };

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
    if (Math.random() < this.newAsteroidNum) {
      this.addAsteroid();
    }
    this.addRefill();
    this.decreaseRefillTime();
    this.ship.decreaseRecoil();
  };

  Game.prototype.decreaseRefillTime = function () {
    var i = 0;
    while (i < this.refills.length) {
      var refill = this.refills[i];
      refill.timeLeft--;
      if (refill.timeLeft === 0) {
        this.refills.splice(i, 1);
      } else {
        i += 1;
      }
    }
  };
})();
