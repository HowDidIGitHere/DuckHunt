class Logo {
  constructor() {
    this.logo = new Image();
    this.logo.addEventListener('load', () => {
    })
    this.logo.src = './duck_hunt_logo.png';
  }
  
  draw(ctx) {
    ctx.drawImage(this.logo, 0, 0, 835, 418, 320, 100, 1000, 500);
  }
}

export default Logo;