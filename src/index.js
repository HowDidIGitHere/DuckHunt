document.addEventListener("DOMContentLoaded", () => {
  console.log("Hello World");
  const gameboard = document.getElementById("gameboard");
  const ctx = gameboard.getContext('2d');

  ctx.fillStyle = 'lightblue';
  ctx.fillRect(0, 0, 1000, 600);
})
