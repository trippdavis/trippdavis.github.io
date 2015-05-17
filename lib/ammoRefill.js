(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var AmmoRefill = Asteroids.AmmoRefill = function (obj) {
    Asteroids.MovingObject.call(this,
    {
      pos: obj.pos,
      vel: [0, 0],
      radius: 5,
      game: obj.game
    });

    this.type = obj.type;
    if (this.type === "Laser") {
      this.color = "#33CCFF";
    } else if (this.type === "Shotgun") {
      this.color = "#FF0000";
    } else if (this.type === "Pistol") {
      this.color = "#009900";
    }
    this.timeLeft = 200;
  };

  Asteroids.Util.inherits(AmmoRefill, Asteroids.MovingObject);
})();
