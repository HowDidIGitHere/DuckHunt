import GameView from "./scripts/game_view";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World");
  const gameboard = document.getElementById("gameboard");
  gameboard.width = 800;
  gameboard.height = 800;
  const ctx = gameboard.getContext('2d');

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, 800, 800);

  const gameView = new GameView(ctx, gameboard);
  gameView.start();

  // let img = new Image();
  // img.addEventListener('load', () => {
  //   console.log("yay!")
  //   ctx.drawImage(img, 30, 30);
  // }, false)
  // img.src = 'duck.png';
})
