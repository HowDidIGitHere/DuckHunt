import GameView from "./scripts/game_view";

document.addEventListener("DOMContentLoaded", () => {
  const gameboard = document.getElementById("gameboard");
  gameboard.width = 800;
  gameboard.height = 770;
  const ctx = gameboard.getContext('2d');

  // ctx.fillStyle = 'lightblue';
  // ctx.fillRect(0, 0, 800, 770);

  const gameView = new GameView(ctx, gameboard);
  // gameView.start();
})
