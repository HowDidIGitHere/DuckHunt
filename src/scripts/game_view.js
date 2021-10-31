import Game from './game';
import Foreground from "./static_object";

class GameView {
  constructor(ctx, gameboard) {
    this.game = new Game(gameboard);
    this.ctx = ctx;
  }

  start() {
    setInterval(() => {
      this.game.moveObjects();
      this.game.draw(this.ctx);
    }, 1);
    // this.lastTime = 0;
    // requestAnimationFrame(this.animate.bind(this));
  }
  
  // animate(time) {
  //   const timeDelta = time - this.lastTime;

  //   this.game.step(timeDelta);
  //   this.game.draw(this.ctx);
  //   this.lastTime = time;

  //   requestAnimationFrame(this.animate.bind(this));
  // }
}

export default GameView;