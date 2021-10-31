import Duck from "./duck";
import Utility from "./utility";
import Foreground from "./static_object";

class Game {
  constructor(gameboard) {
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.NUM_DUCKS = 2;
    this.ducks = this.addDucks();
    this.foreground = new Foreground();
    this.gameboard = gameboard;
    
    const gameboardLeft = gameboard.offsetLeft + gameboard.clientLeft;
    const gameboardTop = gameboard.offsetTop + gameboard.clientTop;

    function collision(clickPos, duck) {
      const x = Math.pow(Math.abs(duck.pos[0] - clickPos[0]), 2);
      const y = Math.pow(Math.abs(duck.pos[1] - clickPos[1]), 2);
      const d = Math.sqrt(x + y);
      return d < duck.radius;
    }

    gameboard.addEventListener('click', (e) => {
      const x = e.pageX - gameboardLeft;
      const y = e.pageY - gameboardTop;

      for (let i = 0; i < this.ducks.length; i++) {
        const duck = this.ducks[i];
        if (collision([x, y], duck)) {
          alert('boom!');
        }
      }
    })
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

    this.foreground.draw(ctx);
  }

  moveObjects() {
    for (let i = 0; i < this.ducks.length; i++) {
      this.ducks[i].move();
    }
  }

  isAlmostOutOfBounds(duck) {
    const randVec = Utility.randomVec(1);
    let vel = duck.vel;
    switch (true) {
      case (duck.pos[0] < 50):
        vel = [Math.abs(randVec[0]), randVec[1]]
        break;
      case (duck.pos[1] < 50):
        vel = [randVec[0], Math.abs(randVec[1])]
        break;
      case (duck.pos[0] > this.DIM_X - 50):
        vel = [-1 * Math.abs(randVec[0]), randVec[1]]
        break;
      case (duck.pos[1] > this.DIM_Y - 300):
        vel = [randVec[0], -1 * Math.abs(randVec[1])]
        break;
    }
    return vel;
  }
}

export default Game;