const Utility = {
  collision(clickPos, duck) {
    const x = Math.pow(Math.abs(duck.pos[0] - clickPos[0]), 2);
    const y = Math.pow(Math.abs(duck.pos[1] - clickPos[1]), 2);
    const d = Math.sqrt(x + y);
    return d < duck.radius;
  },
  downVec(length) {
    return Utility.scale([0, 1], length);
  },
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Utility.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

export default Utility;