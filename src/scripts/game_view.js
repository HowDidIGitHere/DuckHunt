import Game from './game';

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    // setInterval(() => {
    //   this.game.moveObjects();
    //   this.game.draw(this.ctx);
    // }, 1);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }
  
  animate(time) {
    const timeDelta = time - this.lastTime;

    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }

}

export default GameView;