const ToKoreanTime = require("../util/toKoreanTime");
const GetPickupTime = (hosTime, a) => {
  const resDate = new Date(hosTime);
  const b = new Date(resDate - a);
  return ToKoreanTime(b);
};

module.exports = GetPickupTime;
