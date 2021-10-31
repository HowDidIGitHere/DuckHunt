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

  move(delta) {
    const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
    const velocityScale = delta / NORMAL_FRAME_TIME_DELTA,
        offsetX = this.vel[0] * velocityScale,
        offsetY = this.vel[1] * velocityScale;

    let pos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    this.pos = pos;

    if (this.game.isAlmostOutOfBounds(this.pos)) {
      this.vel = this.game.changeDir();
    }
  }
}

export default MovingObject;