class Dog {
  constructor() {
    this.dog = new Image();
    this.dog.addEventListener('load', () => {
    })
    this.dog.src = './src/images/mirrored_duck_hunt_assets.png';
  }
  
  draw(ctx) {
    ctx.drawImage(this.dog, 10, 4, 106, 80, 85, 485, 106 * 1.5, 80 * 1.5);
  }
}

export default Dog;