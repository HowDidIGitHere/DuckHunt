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
      console.log('Loaded assets Objects');
    }, false);
    this.assets.src = 'mirrored_duck_hunt_assets.png';
  }

  draw(ctx) {
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

        // more left than up or down
        // case this.vel[0] < 0 && this.vel[1] > -0.5:
        //   this.changeFrame({ sliceX: 420, sliceY: 731, width: 68, height: 48 })
        //   break;

        // left-down
        case this.vel[0] < 0 && this.vel[1] > 0:
          this.changeFrame({ sliceX: 343, sliceY: 649, width: 58, height: 64 })
          break;
        
        // more right than up or down
        // case this.vel[0] > 0 && this.vel[1] > -0.5:// ((this.vel[1] < 0 && this.vel[1] > -0.5) || (this.vel[1] > 0 && this.vel[1] < 0.5)):
        //   this.changeFrame({ sliceX: 260, sliceY: 225, width: 68, height: 48 })
        //   break;

        // right-down
        case this.vel[0] > 0 && this.vel[1] > 0:
          this.changeFrame({ sliceX: 350, sliceY: 569, width: 58, height: 64 })
          break;


        // // more up than right or left
        // case this.vel[0] > 0 && this.vel[1] < 0 :
        //   this.changeFrame({ sliceX: 342, sliceY: 377, width: 64, height: 62 })
        //   break;


        // more down than right or left
        // NEEDS NEW SPRITE
      }
    }
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