

class UiTracker {
  constructor(score, numShots, gameNumDucks, timer) {
    this.score = score;
    this.numShots = numShots;
    this.gameNumDucks = gameNumDucks;
    this.timer = timer;

    this.uiAssets = new Image();
    this.uiAssets.addEventListener('load', () => {
      console.log('Loaded UI icons')
    })
    this.uiAssets.src = 'duck_hunt_assets.png';
  }

  draw(ctx, numShots) {
    // SCORE
    ctx.font = 'bold 30px Courier';
    ctx.fillStyle = 'white';
    ctx.fillText(`${this.score.join("")}`, 638, 700)
    // SHOT
    // NEED TO LOAD
    this.loadShots(ctx, numShots);
    // HIT
  }

  loadShots(ctx, numShots) {
    for (let i = 0, j = 0; i < numShots; i++, j += 25) {
      ctx.drawImage(this.uiAssets, 0, 541, 20, 20, 51 + j, 677, 25, 25);
    }
  }
}

export default UiTracker;