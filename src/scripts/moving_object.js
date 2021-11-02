import Duck from "./duck";
import Utility from "./utility";

class MovingObject {
  constructor(obj, game) {
    this.pos = obj.pos;
    this.vel = obj.vel;
    this.width = obj.width;
    this.height = obj.height;
    this.sliceX = obj.sliceX;
    this.sliceY = obj.sliceY;

    this.mid = Utility.midpoint(this.pos[0], this.pos[1], this.width, this.height);

    // this.color = obj.color;
    // this.radius = obj.radius;
    
    this.game = game;

    // this.assets = new Image();
    // this.assets.addEventListener('load', () => {
    //   console.log('Loaded Moving Objects');
    // }, false);
    // this.assets.src = 'duck_hunt_assets.png';

    this.mirrored = new Image();
    this.mirrored.addEventListener('load', () => {
      console.log('Loaded mirrored Objects');
    }, false);
    this.mirrored.src = 'mirrored_duck_hunt_assets.png';
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
    if (this instanceof Duck) {
      switch (true) {
        // right-up
        case this.vel[0] > 0 && this.vel[1] < 0 :
          this.changeFrame({ sliceX: 342, sliceY: 301, width: 64, height: 58 })
          break;
        // left-up
        case this.vel[0] < 0 && this.vel[1] < 0:
          this.changeFrame({ sliceX: 342, sliceY: 805, width: 64, height: 58 })
          break;
        // right-down
        case this.vel[0] > 0 && this.vel[1] > 0:
          this.changeFrame({ sliceX: 350, sliceY: 569, width: 58, height: 64 })
          break;
        // left-down
        case this.vel[0] < 0 && this.vel[1] > 0:
          this.changeFrame({ sliceX: 343, sliceY: 649, width: 58, height: 64 })
          break;
        // case this.vel[0] < 0 && this.vel[1] < 0:
        //   this.changeFrame({ sliceX: 342, sliceY: 805, width: 64, height: 58 })
        //   break;
      }
    }
    ctx.drawImage(this.mirrored, this.sliceX, this.sliceY, this.width, 
      this.height, this.pos[0], this.pos[1], this.width * 1.5, this.height * 1.5);
  }

  changeFrame(changes) {
    this.sliceX = changes.sliceX;
    this.sliceY = changes.sliceY;
    this.width = changes.width;
    this.height = changes.height;
  }

}

export default MovingObject;