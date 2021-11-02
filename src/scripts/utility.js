const Utility = {
  midpoint(x1, y1, x2, y2) {
    const x = (x1 + (x1 + x2)) / 2;
    const y = (y1 + (y1 + y2)) / 2;
    console.log(`pos: ${[x1, y1]}    mid?: ${[x, y]}    corner?: ${[x1 + x2, y1 + y2]}`)
    return [x, y];
  },
  collision(clickPos, duck) {
    // const x = Math.pow(Math.abs(duck.pos[0] - clickPos[0]), 2);
    // const y = Math.pow(Math.abs(duck.pos[1] - clickPos[1]), 2);
    // const d = Math.sqrt(x + y);
    // return d < duck.radius;
    return this.inBetweenXOrY(clickPos[0], duck.pos[0], duck.width) && 
      this.inBetweenXOrY(clickPos[1], duck.pos[1], duck.height);
  },
  inBetweenXOrY(xy, duckXY, duckDIM) {
    return xy > duckXY && xy < duckXY + duckDIM;
  },
  downVec(length) {
    return Utility.scale([0, 1.6], length);
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Utility.scale([1.6 * Math.sin(deg), 1.6 * Math.cos(deg)], length);
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

export default Utility;