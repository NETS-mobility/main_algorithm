const ToKoreanTime = require("../util/toKoreanTime");
const getCarAdjRev = require("./getCarAdjRev");

const GetL2 = async (prevDepartureTimeArray, pickupTime) => {
  const L2 = [];
  for (let i = 0; i < prevDepartureTimeArray.length; i++) {
    const car_schedule = await getCarAdjRev(prevDepartureTimeArray[i].car_id, pickupTime);
    if (
      ToKoreanTime(prevDepartureTimeArray[i].prevDepartureTime) >
      car_schedule.prev.time
    ) {
      L2.push(prevDepartureTimeArray[i]);
    }
  }
  return L2;
};

module.exports = GetL2;
