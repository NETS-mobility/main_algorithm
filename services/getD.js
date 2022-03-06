const TmapTimeMachine = require("../module/tmapTimeMachine.js");
const Func = require("../module/getCarAdjRev.js");

const GetD = (L2, drop_x, drop_y) => {
  const L3 = [];
  for (let i = 0; i < L2.length; i++) {
    const nextRes = await Func(L2[i].car_id);
    TmapTimeMachine(
      drop_y,
      drop_x,
      nextRes.next.y,
      nextRes.next.x,
      "departure",
      nextRes.next.time //다음 예약 시작 시간
    ).then((tmapTime) => {
      const resDate = new Date(nextRes.next.time);
      d = new Date(resDate - tmapTime);
      if (L2[i].c < d) L3.push(L2[i].car_id);
    });
  }
  return L3;
};

module.exports = GetD;
