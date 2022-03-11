import TmapTimeMachine from "./tmapTimeMachine";
import ToKoreanTime from "../util/toKoreanTime";
import Func from "./getCarPreNextRevInfo";
import AddMinuteToDate from "../util/addMinuteToDate";
const GetDispatchAvailableCar = async (L2, drop_x, drop_y, hos_time) => {
  const L3 = [];
  let new_hos_time = new Date(hos_time);

  for (let i = 0; i < L2.length; i++) {
    const nextRes = Func(L2[i].car_id);
    // const nextRes = Func(i);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await TmapTimeMachine(
      drop_y,
      drop_x,
      nextRes.post_first_y,
      nextRes.post_first_x,
      "departure",
      nextRes.post_pickup_time
    ).then((tmapTime) => {
      const resDate = new Date(nextRes.post_pickup_time);
      const d = AddMinuteToDate(resDate, -tmapTime.estimatedTime);

      if (ToKoreanTime(AddMinuteToDate(new_hos_time, 0)) < ToKoreanTime(d)) {
        L3.push({
          car_id: L2[i].car_id,
          prevDepartureTime: L2[i].prevDepartureTime,
        });
      }
    });
  }
  return L3;
};

export default GetDispatchAvailableCar;
