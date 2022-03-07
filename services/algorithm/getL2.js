const ToKoreanTime = require("../util/toKoreanTime");
const GetL2 = (b, prevArrivalTimeArray) => {
  const L2 = [];
  for (let i = 0; i < prevArrivalTimeArray.length; i++) {
    if (ToKoreanTime(prevArrivalTimeArray[i].prevArrivalTime) < b) {
      L2.push(prevArrivalTimeArray[i]);
    }
  }
  return L2;
};

module.exports = GetL2;
