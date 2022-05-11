import Game from './game';

class GameView {
  constructor(ctx, gameboard) {
    this.game = new Game(gameboard, true);
    this.ctx = ctx;
  }
}

export default GameView;