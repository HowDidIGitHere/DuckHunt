import MovingObject from "./moving_object"
import Utility from "./utility";


class ClickedDuck extends MovingObject {
  constructor(duck) {
    duck.vel = Utility.downVec(1);
    super(duck, duck.game);
  }

  moveHelper(idx) {
  }

  move(idx) {
    setTimeout(() => {
      const pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
      this.pos = pos;
  
      const dir = this.game.isAlmostOutOfBounds(this)
      if (dir !== this.vel && this === this.game.ducks[idx]) {
        this.game.ducks.splice(idx, 1); 
      }
    }, 500);
    // this.movehelper(idx);
  }
}

export default ClickedDuck;