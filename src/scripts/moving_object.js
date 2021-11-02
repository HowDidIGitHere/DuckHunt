class MovingObject {
  constructor(obj, game) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.width = obj.width;
    this.height = obj.height;

    this.sliceX = obj.sliceX;
    this.sliceY = obj.sliceY;

    // this.color = obj.color;
    // this.radius = obj.radius;
    
    this.game = game;

    this.assets = new Image();
    this.assets.addEventListener('load', () => {
      console.log('Loaded Moving Objects');
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

    ctx.drawImage(this.assets, this.sliceX, this.sliceY, this.width, 
      this.height, this.pos[0], this.pos[1], this.width, this.height);
  }

}

export default MovingObject;