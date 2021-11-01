class MovingObject {
  constructor(obj, game) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.color = obj.color;
    this.radius = obj.radius;
    this.game = game;
    // this.dx = obj.dx;
    // this.dy = obj.dy;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.radius,
      0,
      2 * Math.PI,
      false
    )
    ctx.fill();
  }

}

export default MovingObject;