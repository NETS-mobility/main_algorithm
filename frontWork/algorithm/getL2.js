import ToKoreanTime from "../util/toKoreanTime";
import Func from "./getCarPreNextRevInfo";
const GetL2 = (prevDepartureTimeArray) => {
  const L2 = [];
  for (let i = 0; i < prevDepartureTimeArray.length; i++) {
    const car_schedule = Func(prevDepartureTimeArray[i].car_id);
    if (
      ToKoreanTime(prevDepartureTimeArray[i].prevDepartureTime) >
      car_schedule.prev_terminate_time
    ) {
      L2.push(prevDepartureTimeArray[i]);
    }
  }
  return L2;
};

export default GetL2;
