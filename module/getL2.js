const GetL2 = (b, cArr) => {
  const L2 = [];
  for (let i = 0; i < cArr.length; i++) {
    if (cArr[i].c < b) {
      L2.push(cArr[i]);
    }
  }
  return L2;
};

module.exports = GetL2;
