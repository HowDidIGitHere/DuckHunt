import Duck from "./duck";
import ClickedDuck from "./clicked_duck";
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
    this.NUM_SHOTS = 3;
    
    this.createOnClickListener();
  }

  BG_COLOR = "lightblue";

  removeDuck(idx) {
    if (this.ducks[idx]) {
      this.ducks.splice(idx, 1);      
    }
  }

  shotFired() {
    this.NUM_SHOTS--;
    console.log(`${this.NUM_SHOTS} shots left.`)
  }

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
      this.ducks[i].move(i);
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

  createOnClickListener() {
    const gameboardLeft = this.gameboard.offsetLeft + this.gameboard.clientLeft;
    const gameboardTop = this.gameboard.offsetTop + this.gameboard.clientTop;

    this.gameboard.addEventListener('click', (e) => {
      const x = e.pageX - gameboardLeft;
      const y = e.pageY - gameboardTop;

      for (let i = 0; i < this.ducks.length; i++) {
        const duck = this.ducks[i];
        if (Utility.collision([x, y], duck)) {
          
          this.ducks[i] = new ClickedDuck(this.ducks[i]);
          console.log(i)
        }
      }

      this.shotFired();
    })
  }
}

export default Game;