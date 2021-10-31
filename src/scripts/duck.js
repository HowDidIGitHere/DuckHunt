import Utility from './utility';
import MovingObject from "./moving_object";

class Duck extends MovingObject{
  constructor(obj, game) {
    obj.vel = Utility.randomVec(1);
    obj.radius = 20;
    obj.color = 'brown';

    super(obj, game);

    console.log(obj.vel);
  }
}

export default Duck;