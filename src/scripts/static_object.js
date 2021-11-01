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
    // ctx.fillStyle = 'black';
    // ctx.fillRect(50, 680, 100, 80);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 40, 680, 100, 80, 10, true);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(200, 680, 350, 80);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 180, 680, 350, 80, 10, true);
    // ctx.fillStyle = 'black';
    // ctx.fillRect(600, 680, 150, 80);
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 570, 680, 190, 80, 10, true);
  }

  // https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-using-html-canvas
  // Juan Mendes : https://stackoverflow.com/users/227299/juan-mendes
  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === 'undefined') {
      stroke = true;
    }
    if (typeof radius === 'undefined') {
      radius = 5;
    }
    if (typeof radius === 'number') {
      radius = {tl: radius, tr: radius, br: radius, bl: radius};
    } else {
      var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  
  }

}

export default Foreground;