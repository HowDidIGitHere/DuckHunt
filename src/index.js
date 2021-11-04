import GameView from "./scripts/game_view";

document.addEventListener("DOMContentLoaded", () => {
  const gameboard = document.getElementById("gameboard");
  const modal = document.getElementById("myModal");
  const button = document.getElementById("instructions");
  const close = document.getElementsByClassName("close")[0];
  gameboard.width = 800;
  gameboard.height = 770;
  const ctx = gameboard.getContext('2d');

  button.addEventListener('click', () => {
    modal.style.display = "block";
  })
  
  close.addEventListener('click', () => {
    modal.style.display = "none";
  })

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  })

  // ctx.fillStyle = 'lightblue';
  // ctx.fillRect(0, 0, 800, 770);
  
  const gameView = new GameView(ctx, gameboard);
  // gameView.start();
})
