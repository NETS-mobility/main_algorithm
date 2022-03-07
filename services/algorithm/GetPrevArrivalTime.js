const TmapTimeMachine = require("./tmapTimeMachine");
const Func = require("../../data/GetCarPreNextRevInfo");
const AddMinuteToDate = require("../util/addMinuteToDate");

const GetPrevArrivalTime = async (L1, res_x, res_y) => {
  const prevArrivalTimeArray = [];
  try {
    for (let i = 0; i < L1.length; i++) {
      const car_schedule = Func(i);
      await new Promise((resolve) => setTimeout(resolve, 250));
      await TmapTimeMachine(
        car_schedule.prev_last_y,
        car_schedule.prev_last_x,
        res_y,
        res_x,
        "arrival",
        car_schedule.prev_terminate_time
      ).then((tmapTime) => {
        const resDate = new Date(car_schedule.prev_terminate_time);
        const ctime = AddMinuteToDate(resDate, tmapTime).toString(); //tmap(이전예약->현재 예약 픽업 장소) + 20
        prevArrivalTimeArray.push({
          car_id: L1[i].car_id,
          prevArrivalTime: new Date(ctime),
        });
      });
    }
  } catch (err) {
    return err;
  }
  return prevArrivalTimeArray;
};

module.exports = GetPrevArrivalTime;
