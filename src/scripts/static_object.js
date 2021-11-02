class Foreground {
  constructor() {
    this.foreground = new Image();
    this.foreground.addEventListener('load', () => {
      console.log('Loaded Foreground');
    }, false)
    this.foreground.src = 'duck_hunt_foreground.png';
  }

  draw(ctx) {
    ctx.drawImage(this.foreground, 0, 50, 800, 600);
    ctx.fillStyle = "#996700";
    ctx.fillRect(0, 650, 800, 220)
    // ctx.strokeStyle = 'white';
    // ctx.fillStyle = 'black';
    // ctx.fillRect(40, 680, 100, 80);
    ctx.strokeStyle = '#A6D609';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 40, 665, 100, 80, 10, true);
    ctx.font = 'bold 30px Courier';
    ctx.fillStyle = '#3895D3';
    ctx.fillText('SHOT', 53, 732)
    // ctx.strokeStyle = 'white';
    // ctx.fillStyle = 'black';
    // ctx.fillRect(180, 680, 380, 80);
    ctx.strokeStyle = '#A6D609'; // '#03C04A';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 180, 665, 383, 80, 10, true);
    ctx.font = 'bold 35px Courier';
    ctx.fillStyle = '#A6D609';
    ctx.fillText('HIT', 192, 700)
    // ctx.strokeStyle = 'white';
    // ctx.fillStyle = 'black';
    // ctx.fillRect(600, 680, 160, 80);
    ctx.strokeStyle = '#A6D609';
    ctx.fillStyle = 'black';
    this.roundRect(ctx, 603, 665, 157, 80, 10, true);
    ctx.font = 'bold 30px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText('SCORE', 654, 732)
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