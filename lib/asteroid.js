(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (obj) {
    var vel = Asteroids.Util.randomVel(obj.pos, obj.game);
    var size = Math.floor(Math.random() * 30) + 20;

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: vel,
      radius: size,
      game: obj.game
    });

    this.ctx = obj.ctx;
    this.score = 140 - (size * 2);
  };

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function () {
    this.ctx.drawImage(asteroidImg, this.pos[0] - this.radius, this.pos[1] - this.radius, 2 * this.radius, 2 * this.radius);
  };
})();
