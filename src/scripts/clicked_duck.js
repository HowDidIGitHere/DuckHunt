import MovingObject from "./moving_object"
import Utility from "./utility";


class ClickedDuck extends MovingObject {
  constructor(duck, duck_falls) {
    duck.vel = Utility.downVec(1);
    super(duck, duck.game);
    this.points = duck.points;
    this.clickedSpot = [duck.mid[0], duck.mid[1]];
    this.duck_falls = duck_falls;
    this.mute = document.getElementsByClassName('mute')[0];
  }

  move(idx) {
    // Set frame to shot
    if (this.mid[1] <= this.game.DIM_Y - 250) {
      setTimeout(() => {
        this.game.displayScore(this.clickedSpot, this.points);
        if (this.mute.style.display === 'none') {
          this.duck_falls.play();
        }
        const pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
        this.pos = pos;
        const mid = [this.mid[0] + this.vel[0], this.mid[1] + this.vel[1]];
        this.mid = mid;
        const dir = this.game.isAlmostOutOfBounds(this)
        // Set frame to falling
        if (Math.floor(this.pos[1]) % 2 === 0) {
            this.changeFrame({ sliceX: 176, sliceY: 647, width: 36, height: 60 })
        } else {
            this.changeFrame({ sliceX: 356, sliceY: 457, width: 36, height: 60 })
        }
      }, 500);
    }
  }
}

export default ClickedDuck;