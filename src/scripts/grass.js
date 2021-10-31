class Grass {
  constructor() {

  }

  draw(ctx) {
    ctx.fillStyle = "burlywood";
    ctx.fillRect(0, 550, 800, 250)
    ctx.fillStyle = 'green';
    ctx.fillRect(0, 470, 800, 120);
  }
}

export default Grass;