(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var mo = Asteroids.MovingObject = function (obj) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.radius = obj.radius;
    this.color = obj.color;
    this.game = obj.game;
  };

  mo.prototype.draw = function (ctx) {
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

  mo.prototype.move = function () {
    var newX = this.pos[0] + this.vel[0];
    var newY = this.pos[1] + this.vel[1];
    var pos = [newX, newY];
    this.pos = pos;
  };

  mo.prototype.isCollidedWith = function (otherObject) {
    var x1 = this.pos[0];
    var y1 = this.pos[1];
    var x2 = otherObject.pos[0];
    var y2 = otherObject.pos[1];
    var dist = Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    return (dist < (this.radius + otherObject.radius));
  };
})();
