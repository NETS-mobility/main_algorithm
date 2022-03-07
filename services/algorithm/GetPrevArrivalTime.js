/*
======== GetPrevArrivalTime =======
이전 예약에서 현재 예약으로 출발해야 하는 시간을 구한다. 

return{
  car_id: "차량ID", 
  prevArrivalTime: "이전 예약에서 현재 예약으로 출발하는 시간(추후 배차 우선순위 정할 때 사용)"
}
*/

const TmapTimeMachine = require("./tmapTimeMachine");
const Func = require("../../data/GetCarPreNextRevInfo");
const AddMinuteToDate = require("../util/addMinuteToDate");

const GetPrevArrivalTime = async (L1, res_x, res_y) => {
  const prevArrivalTimeArray = [];
  try {
    for (let i = 0; i < L1.length; i++) {
      const car_schedule = Func(i);
      await new Promise((resolve) => setTimeout(resolve, 250)); //초당 건수가 제한되어 있으므로 sleep
      await TmapTimeMachine(
        car_schedule.prev_last_y,
        car_schedule.prev_last_x,
        res_y,
        res_x,
        "arrival",
        car_schedule.prev_terminate_time
      ).then((tmapTime) => {
        //tmapTime == 이전 예약 드롭 장소에서 현재 예약 픽업 장소까지 가는 데에 소요되는 시간
        const resDate = new Date(car_schedule.prev_terminate_time); //resDate == 이전 예약 종료 시간
        const ctime = AddMinuteToDate(resDate, tmapTime).toString(); //이전 예약 종료 시간 + tmapTime
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
