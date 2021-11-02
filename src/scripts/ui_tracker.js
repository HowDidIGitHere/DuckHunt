import Duck from './duck';

class UiTracker {
  constructor(score, gameNumDucks, timer) {
    this.score = score;
    this.gameNumDucks = gameNumDucks;
    this.timer = timer;

    this.uiAssets = new Image();
    this.uiAssets.addEventListener('load', () => {
      console.log('Loaded UI icons')
    })
    this.uiAssets.src = 'duck_hunt_assets.png';
  }

  draw(ctx, numShots, ducks) {
    // SCORE
    ctx.font = 'bold 35px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.score.join("")}`, 619, 702)
    // SHOT
    this.loadShots(ctx, numShots);
    // HIT
    this.displayHit(ctx, ducks);
    // TIMER
    // this.timer(ctx);
    // placeholder timer fill
    ctx.font = 'bold 20px Courier';
    ctx.fillStyle = '#3895D3';
    ctx.fillText('||||||||||||||||||||||||||||||', 192, 728)
  }

  loadShots(ctx, numShots) {
    for (let i = 0, j = 0; i < numShots; i++, j += 25) {
      ctx.drawImage(this.uiAssets, 0, 541, 20, 20, 50 + j, 677, 25, 25);
    }
  }

  displayHit(ctx, ducks) { // WORKING BUT A LITTLE SUS
    let k = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 2; j++, k += 29) {
        if (ducks[i][j] instanceof Duck) {
          ctx.drawImage(this.uiAssets, 53, 541, 20, 20, 264 + k, 675, 25, 25)
          // ctx.drawImage(this.uiAssets, 71, 541, 1, 1, 264 + k, 675, 25, 25)
        } else {
          ctx.drawImage(this.uiAssets, 26, 541, 20, 20, 264 + k, 675, 25, 25)
          // ctx.drawImage(this.uiAssets, 71, 541, 1, 1, 264 + k, 675, 25, 25)
        }
      }
    }
  }

  // timer(ctx) {
  // }
}

export default UiTracker;