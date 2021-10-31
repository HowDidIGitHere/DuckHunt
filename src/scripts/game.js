import Duck from "./duck";
import Utility from "./utility";

class Game {
  constructor() {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_DUCKS = 2;
    this.ducks = this.addDucks();
  }

  BG_COLOR = "lightblue";

  addDucks() {
    const ducks = [];
    while (ducks.length < this.NUM_DUCKS) {
      const pos = this.randomStartPos();
      ducks.push(new Duck({ pos }, this))
    }
    return ducks;
  }

  randomStartPos() {
    let x = Math.floor(Math.random() * (this.DIM_X - 51)) + 51;
    let y = this.DIM_Y - 301;
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    for (let i = 0; i < this.ducks.length; i++) {
      this.ducks[i].draw(ctx);
    }
  }

  moveObjects() {
    for (let i = 0; i < this.ducks.length; i++) {
      this.ducks[i].move();
    }
  }

  isAlmostOutOfBounds(duck) {
    let randVec = Utility.randomVec(1);
    switch (true) {
      case (duck.pos[0] < 50):
        return [Math.abs(randVec[0]), randVec[1]]
      break;
      case (duck.pos[1] < 50):
        return [randVec[0], Math.abs(randVec[1])]
      break;
      case (duck.pos[0] > this.DIM_X - 50):
        return [-1 * Math.abs(randVec[0]), randVec[1]]
      break;
      case (duck.pos[1] > this.DIM_Y - 300):
        return [randVec[0], -1 * Math.abs(randVec[1])]
      break;
      default:
        return duck.vel;
      break;
    }
  }

}

export default Game;