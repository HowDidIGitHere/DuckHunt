import Duck from "./duck";
import ClickedDuck from "./clicked_duck";
import Utility from "./utility";
import Foreground from "./static_object";
import UiTracker from "./ui_tracker";

class Game {
  constructor(gameboard) {
    this.DIM_X = 800;
    this.DIM_Y = 770;
    this.NUM_SHOTS = 3;
    this.SCORE = [0, 0, 0, 0, 0, 0]; // "000000";
    // this.TIMER = ;
    this.ducks = this.populateAllDucks();
    this.foreground = new Foreground();
    this.ui = new UiTracker(this.SCORE, 10, 10); // NEED TO CHANGE LATER
    // console.log(this.ui);
    this.gameboard = gameboard;
    
    this.createOnClickListener();
  }

  BG_COLOR = "#7AD7F0";

  removeDuck(idx) {
    if (this.ducks[0][idx]) {
      this.ducks[0].splice(idx, 1);      
    }
  }

  shotFired() {
    this.NUM_SHOTS--;
    console.log(`${this.NUM_SHOTS} shots left.`)
  }

  addRoundDucks() {
    const roundDucks = [];
    while (roundDucks.length < 2) {
      const pos = this.randomStartPos();
      roundDucks.push(new Duck({ pos, sliceX: 342, sliceY: 300, width: 64, height: 58 }, this))
    }
    return roundDucks;
  }

  populateAllDucks() {
    const allDucks = [];
    for (let i = 0; i < 5; i++) {
      allDucks.push(this.addRoundDucks());
    }
    return allDucks;
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

    for (let i = 0; i < this.ducks[0].length; i++) {
      this.ducks[0][i].draw(ctx);
    }

    this.foreground.draw(ctx);
    this.ui.draw(ctx, this.NUM_SHOTS, this.ducks);
  }

  moveObjects() {
    for (let i = 0; i < this.ducks[0].length; i++) {
      this.ducks[0][i].move(i);
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

      for (let i = 0; i < this.ducks[0].length; i++) {
        if (Utility.collision([x, y], this.ducks[0][i])) {
          this.ducks[0][i].sliceX = 262;
          this.ducks[0][i].sliceY = 460;
          this.ducks[0][i].width = 62;
          this.ducks[0][i].height = 58;
          this.ducks[0][i] = new ClickedDuck(this.ducks[0][i]);
          // duck.sliceX = 262;
          // duck.sliceY = 460;
          // duck.width = 62;
          // duck.height = 58;
          // console.log(`${i} idx`)
        }
      }

      this.shotFired();
    })
  }
}

export default Game;