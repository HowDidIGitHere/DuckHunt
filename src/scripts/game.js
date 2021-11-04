import Duck from "./duck";
import ClickedDuck from "./clicked_duck";
import Utility from "./utility";
import Foreground from "./static_object";
import UiTracker from "./ui_tracker";
import Dog from "./dog";
import Logo from "./logo";

class Game {
  constructor(gameboard) {
    this.DIM_X = 800;
    this.DIM_Y = 770;
    this.NUM_SHOTS = 3;
    this.SCORE = "00000";
    this.TIMER = 10;
    this.ROUND = 0;
    this.BG_COLOR = "#7AD7F0";
    this.roundIsOver = false;
    this.dog = new Dog();
    this.logo = new Logo();
    this.ducks = this.populateAllDucks().concat([[new Duck({ pos: this.randomStartPos, vel: [0, 0], sliceX: 0, sliceY: 0, width: 0, height: 0 }, this, 1)]]);
    this.foreground = new Foreground();
    this.ui = new UiTracker(10, this.TIMER); // NEED TO CHANGE LATER
    this.gameboard = gameboard;
    this.ctx = this.gameboard.getContext('2d');
    
    this.createOnClickListener();
    console.log(this.ducks)

    // this.doggo();
    this.playRound();

    // // for (let i = 0; i < this.ducks.length; i += 1) {
    //   this.temp = setInterval(() => {
    //     if (this.ROUND > 4) {
    //       clearInterval(this.temp);
    //     }
    //     this.moveObjects();
    //     this.draw(this.ctx);
    //     if (this.isOver()) {
    //       this.roundIsOver = true;
    //       this.roundIsOver = false;
    //       setTimeout(() => {
    //         //   clearInterval(this.temp);
    //           console.log(this.ducks[this.ROUND]);
    //           // alert('ROUND OVER')
    //       }, 1000)
    //       this.ROUND += 1;
    //       this.NUM_SHOTS = 3;
    //       this.TIMER = 10; 
    //     }
    //   }, 1);
    // }


  }
  
  // doggo() {
  //   let i = 1;
  //   setInterval(() => {
  //     this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
  //     this.ctx.fillStyle = this.BG_COLOR;
  //     this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  
  //     this.foreground.draw(this.ctx);
  //     this.ui.draw(this.ctx, this.NUM_SHOTS, this.ducks, this.SCORE);
  //     this.dog.draw(this.ctx);
  //     this.logo.draw(this.ctx);
  //     i++;
  //     console.log(i);
  //   }, 1)
  // }

  overScreen() {
    console.log('done')
    alert('Game Over')
  }

  playRound() {
    const interval = setInterval(() => {
      // console.log(this.ROUND);
      if (this.ROUND > 4) {
        this.overScreen();
        clearInterval(interval);
      }
      this.moveObjects();
      this.draw(this.ctx);
      if (this.isOver()) {
        this.roundIsOver = true;
        // clearInterval(interval);
        // if () {

        // }
        let num = 0;
        for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
          if (Utility.isVeryOutOfBounds(this.ducks[this.ROUND][i].mid)) {
            num += 1;
          }
        }
        console.log(this.ducks[this.ROUND].length)
        if (this.ducks[this.ROUND].length === 0 || this.ducks[this.ROUND].length === num) {
          console.log("ended")
          this.ROUND += 1;
          this.NUM_SHOTS = 3;
          this.roundIsOver = false;
        }
      }
      // console.log(this.ducks)
      // console.log(this.ROUND)
    }, 1)
  }

  // transition() {
  //   this.draw(this.ctx);
  //   this.ROUND += 1;
  //   this.NUM_SHOTS = 3;
  //   this.TIMER = 10;
  //   console.log(this.ROUND);
  // }

  removeDuck(idx) {
    if (this.ducks[this.ROUND][idx]) {
      this.ducks[this.ROUND].splice(idx, 1);
      console.log(this.ducks);
      // this.ducks[this.ROUND] = this.ducks[this.ROUND].slice(idx, )
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
      roundDucks.push(new Duck({ pos, sliceX: 0, sliceY: 0, width: 0, height: 0 }, this, 1));
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
    let x = Math.floor(this.DIM_X / 2);
    let y = this.DIM_Y - 301;
    return [x, y];
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
      this.ducks[this.ROUND][i].draw(ctx);
    }

    this.foreground.draw(ctx);
    this.ui.draw(ctx, this.NUM_SHOTS, this.ducks, this.SCORE);
  }

  moveObjects() {
    for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
      this.ducks[this.ROUND][i].move(i);
    }
  }

  isAlmostOutOfBounds(duck) {
    let vel = duck.vel;
    if (!this.roundIsOver) {
      const randVec = Utility.randomVec(1);
      switch (true) {
        case (duck.mid[0] < 20):
          vel = [Math.abs(randVec[0]), randVec[1]]
          break;
        case (duck.mid[1] < 20):
          vel = [randVec[0], Math.abs(randVec[1])]
          break;
        case (duck.mid[0] > this.DIM_X - 120):
          vel = [-1 * Math.abs(randVec[0]), randVec[1]]
          break;
        case (duck.mid[1] > this.DIM_Y - 300):
          vel = [randVec[0], -1 * Math.abs(randVec[1])]
          break;
      }
    }
    return vel;
  }

  displayScore(pos, points) { // NEEDS REFACTOR
    this.ctx.font = '30px Silkscreen';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`${points}`, pos[0] - 14, pos[1] + 50);
  }

  updateScore(points) {
    let temp = (parseInt(this.SCORE) + points).toString();
    if (temp.length < this.SCORE.length) {
      let extended = '';
      for (let i = 0; i < this.SCORE.length - temp.length; i++) {
        extended += '0';
      }
      for (let i = 0; i < temp.length; i++) {
        extended += temp[i];
      }
      this.SCORE = extended;
    } else {
      this.SCORE = temp;
    }
  }

  isOver() {
    return ((!this.noMoreDucksInRound() && this.NUM_SHOTS <= 0) || 
      (!this.noMoreDucksInRound() && this.timer <= 0) || 
      this.ducks[this.ROUND].length === 0);
  }

  noMoreDucksInRound() {
    let none = true;
    this.ducks[this.ROUND].forEach(duck => {
      if (duck instanceof Duck) {
        none = false;
      }
    })
    return none;
  }

  createOnClickListener() {
    const gameboardLeft = this.gameboard.offsetLeft + this.gameboard.clientLeft;
    const gameboardTop = this.gameboard.offsetTop + this.gameboard.clientTop;

    this.gameboard.addEventListener('click', (e) => {
      const x = e.pageX - gameboardLeft;
      const y = e.pageY - gameboardTop - 179;
      // const x = e.clientX - gameboardLeft;
      // const y = e.clientY - gameboardTop - 179;

      for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
        if (this.ducks[this.ROUND][i] instanceof Duck && Utility.collision([x, y], this.ducks[this.ROUND][i])) {
          // console.log(`vel[0] = ${this.ducks[this.ROUND][i].vel[0]}`);
          // console.log(`vel[1] = ${this.ducks[this.ROUND][i].vel[1]}`);
          this.ducks[this.ROUND][i].changeFrame({ sliceX: 262, sliceY: 460, width: 62, height: 58 });
          this.ducks[this.ROUND][i] = new ClickedDuck(this.ducks[this.ROUND][i]);
          this.ctx.fillStyle = 'black';
          this.ctx.fillRect[x, y, 4, 4];
          this.updateScore(this.ducks[this.ROUND][i].points);
          // console.log(`${i} idx`)
        }
      }
      this.shotFired();
    })
  }
}

export default Game;