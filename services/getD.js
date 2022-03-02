const TmapTimeMachine = require("../module/tmapTimeMachine.js");
const Func = require("../module/getCarPreNextRevInfo.js");

const GetD = (L2, drop_x, drop_y) => {
  const L3 = [];
  for (let i = 0; i < L2.length; i++) {
    const nextRes = Func(L2[i].car_id);
    TmapTimeMachine(
      drop_y,
      drop_x,
      nextRes.post_first_y,
      nextRes.post_first_x,
      "departure",
      nextRes.post_pickup_time //다음 예약 시작 시간
    ).then((tmapTime) => {
      const resDate = new Date(nextRes.post_pickup_time);
      d = new Date(resDate - tmapTime);
      if (L2[i].c < d) L3.push(L2[i].car_id);
    });
  }
  return L3;
};

module.exports = GetD;
