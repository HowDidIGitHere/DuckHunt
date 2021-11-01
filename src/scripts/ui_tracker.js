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
    ctx.font = 'bold 30px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.score.join("")}`, 638, 700)
    // SHOT
    this.loadShots(ctx, numShots);
    // HIT
    this.displayHit(ctx, ducks);
    // TIMER
    // this.timer(ctx);
  }

  loadShots(ctx, numShots) {
    for (let i = 0, j = 0; i < numShots; i++, j += 25) {
      ctx.drawImage(this.uiAssets, 0, 541, 20, 20, 50 + j, 677, 25, 25);
    }
  }

  displayHit(ctx, ducks) {
    for (let i = 0, j = 0; i < 2; i++, j += 29) {
      if (ducks[i] instanceof Duck) {
        ctx.drawImage(this.uiAssets, 53, 541, 20, 20, 264 + j, 675, 25, 25)
      } else {
        ctx.drawImage(this.uiAssets, 26, 541, 20, 20, 264 + j, 675, 25, 25)
      }
    }
  }

  // timer(ctx) {

  // }
}

export default UiTracker;