(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  if (typeof Asteroids.Util === "undefined") {
    window.Asteroids.Util = {};
  }

  Asteroids.Util.inherits = function (ChildClass, ParentClass) {
    function Surrogate () {}
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Asteroids.Util.randomVec = function (length) {
    var x = (length * Math.random()) + 1;
    var y = (length * Math.random()) + 1;
    return [x, y];
  };

  Asteroids.Util.randomVel = function (pos, game) {
    var vel = Asteroids.Util.randomVec(1);
    var neg = (Math.random() > 0.5);
    if (pos[0] === 0 || pos[0] === game.dimX) {
      if (neg) {
        vel[1] = -vel[1];
      }
      if (pos[0] === game.dimX) {
        vel[0] = -vel[0];
      }
    } else {
      if (neg) {
        vel[0] = -vel[0];
      }
      if (pos[1] === game.dimY) {
        vel[1] = -vel[1];
      }
    }

    return vel;
  };
})();
