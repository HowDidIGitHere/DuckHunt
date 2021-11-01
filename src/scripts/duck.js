import Utility from './utility';
import MovingObject from "./moving_object";

class Duck extends MovingObject {
  constructor(obj, game) {
    obj.vel = Utility.randomVec(1);
    obj.radius = 20;
    obj.color = 'brown';

    super(obj, game);

    console.log(obj.vel);
  }

  move(game, idx) {
    const pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
    this.pos = pos;

    this.vel = this.game.isAlmostOutOfBounds(this)
  }
}

export default Duck;