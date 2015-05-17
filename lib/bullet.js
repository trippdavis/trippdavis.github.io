(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (obj) {
    var vel = [20 * Math.cos(obj.dir), 20 * Math.sin(obj.dir)];

    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: vel,
      radius: 3,
      color: "#FFFFFF",
      game: obj.game
    });
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);
})();
