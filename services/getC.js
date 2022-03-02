const TmapTimeMachine = require("../module/tmapTimeMachine.js"); //tmap 타임머신 경로 찾기
const Func = require("../module/getCarPreNextRevInfo.js");

const GetC = (L1, res_x, res_y) => {
  const cArr = [];
  for (let i = 0; i < L1.length; i++) {
    const car_schedule = Func(L1[i].car_id);
    TmapTimeMachine(
      car_schedule.prev_last_y,
      car_schedule.prev_last_x,
      res_y,
      res_x,
      "arrival",
      car_schedule.prev_terminate_time
    ).then((tmapTime) => {
      const resDate = new Date(car_schedule.prev_terminate_time);
      ctime = new Date(resDate + (tmapTime + 20)); //tmap(이전예약->현재 예약 픽업 장소) + 20
      cArr.push({ car_id: L1[i].car_id, c: ctime });
    });
  }
  return cArr;
};

module.exports = GetC;
