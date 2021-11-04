class Logo {
  constructor() {
    this.logo = new Image();
    this.logo.addEventListener('load', () => {
      console.log('Loaded Logo')
    })
    this.logo.src = './duck_hunt_logo.png';
  }
  
  draw(ctx) {
    ctx.drawImage(this.logo, 0, 0, 835, 418, 280, 100, 450, 225);
  }
}

export default Logo;