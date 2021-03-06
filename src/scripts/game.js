import Duck from "./duck";
import ClickedDuck from "./clicked_duck";
import Utility from "./utility";
import Foreground from "./static_object";
import UiTracker from "./ui_tracker";
import Dog from "./dog";
import Logo from "./logo";

class Game {
  constructor(gameboard, intro) {
    this.DIM_X = 800;
    this.DIM_Y = 770;
    this.NUM_SHOTS = 3;
    this.SCORE = "00000";
    this.TIMER = 10;
    this.ROUND = 0;
    this.BG_COLOR = "#7AD7F0";
    this.gameIsOver = false;
    this.intro = intro;
    this.roundIsOver = false;
    this.dog = new Dog();
    this.logo = new Logo();
    this.ducks = this.populateAllDucks().concat([[new Duck({ pos: this.randomStartPos, vel: [0, 0], sliceX: 0, sliceY: 0, width: 0, height: 0 }, this, 1)]]);
    this.foreground = new Foreground();
    this.ui = new UiTracker(10, this.TIMER); // NEED TO CHANGE LATER
    this.gameboard = gameboard;
    this.ctx = this.gameboard.getContext('2d');
    this.shotSound = document.getElementById('shot');
    this.duck_falls = document.getElementById('duck-falls');
    this.game_over = document.getElementById('game-over');
    this.title_screen = document.getElementById('title-screen-song');
    this.start_game = document.getElementById('start-game-song');
    this.mute = document.getElementsByClassName('mute')[0];
    
    this.createOnClickListener();
    if (this.intro) {
      const introInterval = setInterval(() => {
        if (!this.intro) {
          clearInterval(introInterval);
        } else {
          this.playIntro(this.ctx);
        }
      }, 1)
    } else {
      this.countDown();
      this.ctx.fillText('GET READY!', 300, 200)
      setTimeout(() => {
        this.countDown();
        this.ctx.fillText('1...', 300, 200);
        setTimeout(() => {
          this.countDown();
          this.ctx.fillText('2...', 350, 230);
          setTimeout(() => {
            this.countDown();
            this.ctx.fillText('3...', 380, 260);
            setTimeout(() => {
              this.countDown();
              this.ctx.fillText('GO!', 410, 290);
            }, 1200);
          }, 1200);
        }, 1200);
      }, 1200);
      setTimeout(() => {
        this.playRound();
      }, 5600);
    }
  }

  countDown() {
    this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
    this.ctx.fillStyle = this.BG_COLOR;
    this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    this.foreground.draw(this.ctx);
    this.ui.draw(this.ctx, this.NUM_SHOTS, this.ducks, this.SCORE);
    this.ctx.font = 'bold 60px Courier';
    this.ctx.fillStyle = 'white';
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  playIntro(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
    ctx.fillStyle = this.BG_COLOR;
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);

    this.foreground.draw(ctx);
    this.ui.draw(ctx, this.NUM_SHOTS, this.ducks, this.SCORE);

    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'white';
    this.roundRect(this.ctx, 300, 70, 400, 235, 10, true);

    this.logo.draw(ctx)

    this.ctx.fillStyle = 'black';
    this.ctx.strokeStyle = 'white';
    this.roundRect(this.ctx, 420, 290, 255, 50, 10, true);

    this.ctx.font = 'bold 20px Courier';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText('Click Here To Play!', 435, 320)

    const titleInterval = setInterval(() => {
      if (!this.intro) {
        clearInterval(titleInterval);
        this.title_screen.pause();
        this.title_screen.currentTime = 0;
      } else {
        if (this.mute.style.display === 'none') {
          this.title_screen.play();
        } else {
          this.title_screen.pause();
        }
      }
    }, 1);
  }

  playRound() {
    const interval = setInterval(() => {
      if (this.ROUND > 4) {
        const timeout = setTimeout(() => {
          clearInterval(interval);
          this.gameIsOver = true;
          this.game_over.play();
          this.ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y)
          this.ctx.fillStyle = this.BG_COLOR;
          this.ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
          this.foreground.draw(this.ctx);
          this.ui.draw(this.ctx, this.NUM_SHOTS, this.ducks, this.SCORE);

          this.ctx.fillStyle = 'black';
          this.ctx.strokeStyle = 'white';
          this.roundRect(this.ctx, 280, 140, 420, 80, 10, true);

          this.ctx.font = 'bold 70px Courier';
          this.ctx.fillStyle = 'white';
          this.ctx.fillText('GAME OVER', 300, 200);
          
          setTimeout(() => { //Score
            const output = {
              '10000': {
                res: 'PERFECT SCORE!',
                pos: 350,
                x: 318,
              },
              '01000': {
                res: 'YOU GOT 1 DUCK!',
                pos: 342,
                x: 336,
              },
              '00000': {
                res: 'BETTER LUCK NEXT TIME!',
                pos: 266,
                x: 482,
              }
            }

            this.ctx.fillStyle = 'black';
            this.ctx.strokeStyle = 'white';
            this.roundRect(this.ctx, output[this.SCORE] ? output[this.SCORE].pos - 15 : 310, 227, output[this.SCORE] ? output[this.SCORE].x : 360, 50, 10, true);
            this.ctx.font = 'bold 35px Courier';
            this.ctx.fillStyle = 'white';
            // this.ctx.fillText(this.SCORE === '10000' ? 'PERFECT SCORE!' : `YOU GOT ${this.SCORE[1]} DUCKS!`, this.SCORE === '10000' ? 350 : 325, 250);
            this.ctx.fillText(output[this.SCORE] ? output[this.SCORE].res : `YOU GOT ${this.SCORE[1]} DUCKS!`, output[this.SCORE] ? output[this.SCORE].pos : 325, 262)
          }, 1000);

          setTimeout(() => { //Play Again button
            this.ctx.fillStyle = 'black';
            this.ctx.strokeStyle = 'white';
            this.roundRect(this.ctx, 470, 285, 160, 50, 10, true);

            this.ctx.font = 'bold 20px Courier';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText('Play Again?', 485, 315)
          }, 2000);
        }, 1000)
      } else {
        this.moveObjects();
        this.draw(this.ctx);
        if (this.isOver()) {
          this.roundIsOver = true;
          let num = 0;
          for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
            if (Utility.isVeryOutOfBounds(this.ducks[this.ROUND][i].mid)) {
              num += 1;
            }
          }
          if (this.ducks[this.ROUND].length === 0 || this.ducks[this.ROUND].length === num) {
            this.ROUND += 1;
            this.NUM_SHOTS = 3;
            this.roundIsOver = false;
          }
        }
      }
    }, 1);
  }

  removeDuck(idx) {
    if (this.ducks[this.ROUND][idx]) {
      this.ducks[this.ROUND].splice(idx, 1);
    }
  }

  shotFired() {
    this.NUM_SHOTS--;
    if (this.mute.style.display === 'none') {
      const clone = this.shotSound.cloneNode(true);
      clone.play();
    }
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
    let x = Math.floor(Math.random() * this.DIM_X);
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
      (this.ducks[this.ROUND][0] instanceof ClickedDuck && this.ducks[this.ROUND][1] instanceof ClickedDuck) || this.roundIsOver);
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
      if (this.NUM_SHOTS > 0 && this.ROUND <= 4 && !this.gameIsOver && !this.intro) {
        const x = e.pageX - gameboardLeft - 5;
        const y = e.pageY - gameboardTop;
  
        for (let i = 0; i < this.ducks[this.ROUND].length; i++) {
          if (this.ducks[this.ROUND][i] instanceof Duck && Utility.collision([x, y], this.ducks[this.ROUND][i])) {
            this.ducks[this.ROUND][i].changeFrame({ sliceX: 262, sliceY: 460, width: 62, height: 58 });
            this.ducks[this.ROUND][i] = new ClickedDuck(this.ducks[this.ROUND][i], this.duck_falls.cloneNode(true));
            this.updateScore(this.ducks[this.ROUND][i].points);
          }
        }
        this.shotFired();
      } else if (this.ROUND > 4 && this.gameIsOver) {
        const x = e.pageX - gameboardLeft - 7;
        const y = e.pageY - gameboardTop - 7;
  
        if (x >= 485 && x <= 645 && y >= 275 && y <= 325) {
          this.start_game.play();
          this.ROUND = 0;
          const newGame = () => {
            const again = new Game(this.gameboard, false);
          }
          newGame();
        }
      } else if (this.intro) {
        const x = e.pageX - gameboardLeft - 7;
        const y = e.pageY - gameboardTop - 7;

        if (x >= 420 && x <= 675 && y >= 290 && y <= 340) {
          this.start_game.play();
          this.intro = false;
          this.ROUND = 0;
          const newGame = () => {
            const again = new Game(this.gameboard, false);
          }
          newGame();
        }
      }
    })
  }
}

export default Game;