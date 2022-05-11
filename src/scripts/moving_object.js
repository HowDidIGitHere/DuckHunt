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

    this.assets = new Image();
    this.assets.addEventListener('load', () => {
    }, false);
    this.assets.src = './src/images/mirrored_duck_hunt_assets.png';
  }

  draw(ctx) {
    if (this instanceof Duck) {
      // const clone = this.game.flap.cloneNode(true);
      switch (true) {
        // right-up
        case this.vel[0] > 0 && this.vel[1] < 0 :
          if (this.flap <= 25) {
            this.changeFrame({ sliceX: 268, sliceY: 297, width: 50, height: 62 })
          } else if (this.flap > 25 && this.flap <= 50) {
            this.changeFrame({ sliceX: 342, sliceY: 301, width: 64, height: 58 })
          } else if (this.flap > 50 && this.flap <= 75) {
            this.changeFrame({ sliceX: 426, sliceY: 297, width: 54, height: 62 })
          }
          break;

        // left-up
        case this.vel[0] < 0 && this.vel[1] < 0:
          if (this.flap <= 25) {
            this.changeFrame({ sliceX: 268, sliceY: 803, width: 54, height: 62 })
          } else if (this.flap > 25 && this.flap <= 50) {
            this.changeFrame({ sliceX: 342, sliceY: 805, width: 64, height: 58 })
          } else if (this.flap > 50 && this.flap <= 75) {
            this.changeFrame({ sliceX: 430, sliceY: 803, width: 50, height: 62 })
          }
          break;

        // // more left than up or down
        // case this.vel[0] < 0 && ((this.vel[1] > 0 && this.vel[1] <= 0.5) || (this.vel[1] < 0 && this.vel[1] >= -0.5)):
        //   this.changeFrame({ sliceX: 430, sliceY: 731, width: 68, height: 48 })
        //   break;

        // left-down
        case this.vel[0] < 0 && this.vel[1] > 0:
          if (this.flap <= 25) {
            this.changeFrame({ sliceX: 262, sliceY: 655, width: 62, height: 54 })
          } else if (this.flap > 25 && this.flap <= 50) {
            this.changeFrame({ sliceX: 343, sliceY: 649, width: 58, height: 64 })
          } else if (this.flap > 50 && this.flap <= 75) {
            this.changeFrame({ sliceX: 423, sliceY: 655, width: 62, height: 50 })
          }
          break;
        
        // // more right than up or down
        // case this.vel[0] > 0 && ((this.vel[1] > 0 && this.vel[1] <= 0.5) || (this.vel[1] < 0 && this.vel[1] >= -0.5)):
        //   this.changeFrame({ sliceX: 250, sliceY: 225, width: 68, height: 48 })
        //   break;

        // right-down
        case this.vel[0] > 0 && this.vel[1] > 0:
          if (this.flap <= 25) {
            this.changeFrame({ sliceX: 266, sliceY: 575, width: 62, height: 50 })
          } else if (this.flap > 25 && this.flap <= 50) {
            this.changeFrame({ sliceX: 350, sliceY: 569, width: 58, height: 64 })
          } else if (this.flap > 50 && this.flap <= 75) {
            this.changeFrame({ sliceX: 427, sliceY: 575, width: 62, height: 54 })
          }
          break;


        // // more up than right or left
        // case this.vel[0] > 0 && this.vel[1] < 0 :
        //   this.changeFrame({ sliceX: 342, sliceY: 377, width: 64, height: 62 })
        //   break;


        // more down than right or left
        // NEEDS NEW SPRITE
        
      }
    }
    this.flap += 1;
    if (this.flap > 75) {
      this.flap = 1;
    }
    // ctx.fillstyle = 'brown';
    // ctx.fillrect(this.pos[0], this.pos[1], this.width * 1.5, this.height * 1.5);
    ctx.drawImage(this.assets, this.sliceX, this.sliceY, this.width, 
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