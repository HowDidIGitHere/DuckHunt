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

  moveObjects(delta) {
    for (let i = 0; i < this.ducks.length; i++) {
      this.ducks[i].move(delta);
    }
  }

  isAlmostOutOfBounds(pos) {
    return (pos[0] < 50) || (pos[1] < 50) || (pos[0] > this.DIM_X - 50) || (pos[1] > this.DIM_Y - 300);
  }

  changeDir() {
    return Utility.randomVec(1);
  }

  step(delta) {
    this.moveObjects(delta);
  }

}

export default Game;