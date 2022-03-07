const TmapTimeMachine = require("./tmapTimeMachine");
const ToKoreanTime = require("../util/toKoreanTime");
const Func = require("../../data/GetCarPreNextRevInfo");
const AddMinuteToDate = require("../util/addMinuteToDate");

/*
======== GetDispatchAvailableCar =======
최종 배차 가능한 car_id들을 반환 (이 함수에서 sort는 하지 않음)

return {
  car_id: "차량ID", 
  prevArrivalTime: "이전 예약에서 현재 예약으로 출발하는 시간(추후 배차 우선순위 정할 때 사용)"
}
*/
const GetDispatchAvailableCar = async (L2, drop_x, drop_y, hos_time) => {
  const L3 = [];
  let new_hos_time = new Date(hos_time);

  for (let i = 0; i < L2.length; i++) {
    // const nextRes = Func(L2[i].car_id);
    const nextRes = Func(i);
    await new Promise((resolve) => setTimeout(resolve, 250)); //초당 건수가 2회로 정해져있기 때문에 sleep
    await TmapTimeMachine(
      drop_y,
      drop_x,
      nextRes.post_first_y,
      nextRes.post_first_x,
      "departure",
      nextRes.post_pickup_time
    ).then((tmapTime) => {
      //tmapTime == 현재 예약에서 다음 예약 장소까지 걸리는 시간 구함. (분)
      const resDate = new Date(nextRes.post_pickup_time); //resDate == 다음 예약 픽업 시간
      const d = AddMinuteToDate(resDate, -tmapTime); //d == (다음 예약 픽업 시간 - tmapTime) == 다음 예약으로 출발해야하는 시간
      console.log("this is d===========", d);

      //서비스 종료 시간
      //=> if (case1) 병원도착시간
      //=> if (case2 || case3) 병원출발시간 + 병원->집 예상소요시간

      //if(서비스 종료 시간 < 다음 예약으로 출발해야하는 시간)
      if (ToKoreanTime(new_hos_time) < ToKoreanTime(d))
        L3.push({
          car_id: L2[i].car_id,
          prevArrivalTime: L2[i].prevArrivalTime,
        });
    });
  }
  return L3;
};

module.exports = GetDispatchAvailableCar;
