import Utility from './utility';
import MovingObject from "./moving_object";

class Duck extends MovingObject {
  constructor(obj, game, flap) {
    obj.vel = Utility.randomVec(1);
    // obj.radius = 30;
    // obj.sx = ;
    // obj.sy = ;
    // obj.color = 'brown';
    super(obj, game);

    this.flap = flap;
    this.points = 1000;
  }

  move(idx) {
    if (this.game.roundIsOver) {
      this.vel[0] = 1.28;
      this.vel[1] = -1.28;
    } 
    const pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = pos;
    const mid = [this.mid[0] + this.vel[0], this.mid[1] + this.vel[1]];
    this.mid = mid;

    this.vel = this.game.isAlmostOutOfBounds(this)
  }
}

export default Duck;