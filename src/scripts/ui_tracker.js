import Duck from './duck';

class UiTracker {
  constructor(gameNumDucks, timer) {
    this.gameNumDucks = gameNumDucks;
    this.timer = timer;

    this.uiAssets = new Image();
    this.uiAssets.addEventListener('load', () => {
    })
    this.uiAssets.src = 'duck_hunt_assets.png';
  }

  draw(ctx, numShots, ducks, score) {
    // SCORE
    // ctx.font = 'bold 35px Courier';
    this.updateScoreAndDisplay(ctx, score);
    // SHOT
    this.loadShots(ctx, numShots);
    // HIT
    this.displayHit(ctx, ducks);
    // TIMER
    // this.timer(ctx);
    // placeholder timer fill
    ctx.font = 'bold 20px Courier';
    // ctx.font = '25px Silkscreen';
    ctx.fillStyle = '#3895D3';
    ctx.fillText('||||||||||||||||||||||||||||||', 190, 728) // 20 ticks
  }

  updateScoreAndDisplay(ctx, score) {
    ctx.font = 'bold 40px Courier';
    // ctx.font = '37px Silkscreen';
    ctx.fillStyle = 'white';
    ctx.fillText(`${score}`, 622, 702)
  }

  loadShots(ctx, numShots) {
    for (let i = 0, j = 0; i < numShots; i++, j += 28) {
      ctx.drawImage(this.uiAssets, 0, 541, 20, 20, 47.5 + j, 675, 27, 27);
    }
  }

  displayHit(ctx, ducks) { // WORKING BUT A LITTLE SUS
    let k = 0
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 2; j++, k += 29) {
        if (ducks[i][j] instanceof Duck) {
          ctx.drawImage(this.uiAssets, 53, 541, 20, 20, 260 + k, 675, 25, 25)
          // ctx.drawImage(this.uiAssets, 71, 541, 1, 1, 264 + k, 675, 25, 25)
        } else {
          ctx.drawImage(this.uiAssets, 26, 541, 20, 20, 260 + k, 675, 25, 25)
          // ctx.drawImage(this.uiAssets, 71, 541, 1, 1, 264 + k, 675, 25, 25)
        }
      }
    }
  }

  // timer(ctx) {
  // }
}

export default UiTracker;