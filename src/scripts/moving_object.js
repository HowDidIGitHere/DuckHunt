class MovingObject {
  constructor(obj, game) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.color = obj.color;
    this.radius = obj.radius;
    this.game = game;
    this.sx = obj.sx;
    this.sy = obj.sy;
    this.assets = new Image();
    this.assets.addEventListener('load', () => {
      console.log("yay!")
    }, false)
    this.assets.src = 'duck_hunt_assets.png';
  }

  draw(ctx) {
    // ctx.fillStyle = this.color;
    // ctx.beginPath();
    // ctx.arc(
    //   this.pos[0],
    //   this.pos[1],
    //   this.radius,
    //   0,
    //   2 * Math.PI,
    //   false
    // )
    // ctx.fill();

    ctx.drawImage(this.assets, 342, 300, 64, 58, this.pos[0], this.pos[1], 64, 58);
  }

}

export default MovingObject;