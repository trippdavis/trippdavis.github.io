(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Ship = Asteroids.Ship = function (obj) {
    this.safeTime = 100;
    this.ctx = obj.ctx;
    this.image = spaceshipSafeImg;
    this.currentGun = "Pistol";
    this.recoil = 0;
    this.initialAmmo();
    this.gunIndex = 0;
    this.theta = 0;
    this.vel = [0, 0];
    this.radius = 25;
    this.game = obj.game;
    this.pos = this.placeInCenter();
  };

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.initialAmmo = function () {
    this.guns = {
      Pistol: 100,
      Shotgun: 5,
      Laser: 10
    };
  };

  Ship.prototype.placeInCenter = function () {
    return [(this.game.dimX / 2), (this.game.dimY / 2)];
  };

  Ship.prototype.draw = function () {
    this.ctx.save();
    this.ctx.translate(this.pos[0], this.pos[1]);
    var deltaTheta = (Math.PI / 2) + this.theta;
    this.ctx.rotate(deltaTheta);
    this.ctx.drawImage(this.image, -spaceshipImg.width / 2, -spaceshipImg.width / 2);
    this.ctx.restore();
  };

  Ship.prototype.move = function () {
    this.vel[0] *= 0.99;
    this.vel[1] *= 0.99;
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutOfBounds(this.pos)) {
      this.pos = this.game.wrap(this.pos);
    }
  };

  Ship.prototype.newLife = function () {
    this.pos = this.placeInCenter();
    this.safeTime = 100;
    this.image = spaceshipSafeImg;
    this.currentGun = "Pistol";
    this.vel = [0, 0];
    this.theta = 0;
    this.initialAmmo();
  };

  Ship.prototype.changeSpeed = function (mult) {
    this.vel[0] += (mult * Math.cos(this.theta));
    this.vel[1] += (mult * Math.sin(this.theta));
  };

  Ship.prototype.changeDir = function (mult) {
    this.theta += (mult * 0.05);
  };

  Ship.prototype.shootGun = function () {
    if (this.guns[this.currentGun] > 0 && this.recoil === 0 && this.safeTime === 0) {
      switch (this.currentGun) {
        case "Pistol":
          this.shootPistol();
          break;
        case "Shotgun":
          this.shootShotgun();
          break;
        case "Laser":
          this.shootLaser();
          break;
      }
      this.image = spaceshipRecoilImg;
    }
  };

  Ship.prototype.shootPistol = function () {
    gunshotSound.play();
    var bullet = new Asteroids.Bullet({ pos: this.pos, dir: this.theta, game: this.game, ctx: this.ctx });
    this.game.bullets.push(bullet);
    this.guns[this.currentGun]--;
    this.recoil = 10;
  };

  Ship.prototype.shootShotgun = function () {
    shotgunSound.play();
    var delThetas = [-0.174533, -0.087266, 0, 0.087266, 0.174533];
    var i, x, y, newTheta, bullet;
    for (i = 0; i < delThetas.length; i++) {
      newTheta = this.theta + delThetas[i];
      bullet = new Asteroids.Bullet({ pos: this.pos, dir: newTheta, game: this.game, ctx: this.ctx });
      this.game.bullets.push(bullet);
    }

    this.guns[this.currentGun]--;
    this.recoil = 30;
  };

  Ship.prototype.shootLaser = function () {
    laserSound.play();
    var laser = new Asteroids.Laser({ pos: this.pos, dir: this.theta, game: this.game, ctx: this.ctx });
    this.game.lasers.push(laser);
    this.guns[this.currentGun]--;
    this.recoil = 50;
  };

  Ship.prototype.decreaseSafeTime = function () {
    this.safeTime--;
    if (this.safeTime === 0) {
      this.image = spaceshipImg;
    }
  };

  Ship.prototype.decreaseRecoil = function () {
    this.recoil--;
    if (this.recoil === 0) {
      this.image = spaceshipImg;
    }
  };

  Ship.prototype.ammoRefill = function (type) {
    refillAudio.play();

    if (type === "Laser") {
      this.guns.Laser += 20;
    } else if (type === "Shotgun") {
      this.guns.Shotgun += 10;
    } else if (type === "Pistol") {
      this.guns.Pistol += 50;
    }
  };
})();
