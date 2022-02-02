import GameView from "./scripts/game_view";

document.addEventListener("DOMContentLoaded", () => {
  // gameboard
  const gameboard = document.getElementById("gameboard");
  gameboard.width = 800;
  gameboard.height = 770;
  const ctx = gameboard.getContext('2d');

  // modal
  const modal = document.getElementById("instructionsModal");
  const button = document.getElementById("instructions");
  const close = document.getElementsByClassName("close")[0];
  button.addEventListener('click', () => {
    modal.style.display = "block";
  });
  close.addEventListener('click', () => {
    modal.style.display = "none";
  });
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  // volume
  const volume = document.getElementsByClassName('volume')[0];
  const mute = document.getElementsByClassName('mute')[0];
  const volUp = document.getElementsByClassName('vol-up')[0];
  const sounds = document.getElementsByClassName('sounds');
  volume.addEventListener('click', (e) => {
    if (e.target.classList.contains('mute')) {
      for (let i = 0; i < sounds.length; i++) {
        sounds[i].muted = false;
      }
      mute.style.display = 'none';
      volUp.style.display = 'block';
    } else {
      for (let i = 0; i < sounds.length; i++) {
        sounds[i].muted = true;
      }
      mute.style.display = 'block';
      volUp.style.display = 'none';
    }
  });
  
  const gameView = new GameView(ctx, gameboard);
  // gameView.start();
})
