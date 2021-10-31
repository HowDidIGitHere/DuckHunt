const Utility = {
  randomVec(length) {
    const deg = 2 * Math.PI * Math.random();
    return Utility.scale([Math.sin(deg), Math.cos(deg)], length);
  },
  scale(vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

export default Utility;