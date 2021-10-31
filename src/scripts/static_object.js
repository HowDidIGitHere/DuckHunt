class Foreground {
  constructor() {
    this.img = new Image();
    this.img.addEventListener('load', () => {
      console.log("yay!")
    }, false)
    this.img.src = 'duck_hunt_foreground.png';
  }

  draw(ctx) {
    ctx.drawImage(this.img, 0, 50, 800, 600);
    ctx.fillStyle = "#996700";
    ctx.fillRect(0, 650, 800, 250)
    // ctx.fillStyle = 'green';
    // ctx.fillRect(0, 470, 800, 120);
  }

}

export default Foreground;