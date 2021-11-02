import MovingObject from "./moving_object"
import Utility from "./utility";


class ClickedDuck extends MovingObject {
  constructor(duck) {
    duck.vel = Utility.downVec(1);
    duck.sliceX = 262;
    duck.sliceY = 460;
    duck.width = 62;
    duck.height = 58;
    super(duck, duck.game);
  }

  move(idx) {
    // Set frame to shot
    setTimeout(() => {
      console.log(this);
      const pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      this.pos = pos;
      const dir = this.game.isAlmostOutOfBounds(this)
      if (dir !== this.vel && this === this.game.ducks[idx]) {
        // this.game.ducks.splice(idx, 1);
        this.game.removeDuck(idx);
      }
      // Set frame to falling
      this.changeFrame({ sliceX: 356, sliceY: 458, width: 36, height: 60 })
    }, 500);
  }
}

export default ClickedDuck;