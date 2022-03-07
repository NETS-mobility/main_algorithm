/*
======== GetL2 =======
이전 예약을 이용해 배차 가능한 차량을 필터링.

if(이전 예약에서 현재 예약으로 춭발하는 시간(prevArrivalTime) < 현재 예약의 픽업 장소에 도착해야 하는 시간(pickupTime)){
  L2에 넣음
}

return{
  car_id: "차량ID", 
  prevArrivalTime: "이전 예약에서 현재 예약으로 출발하는 시간(추후 배차 우선순위 정할 때 사용)"
}
*/

const ToKoreanTime = require("../util/toKoreanTime");
const GetL2 = (b, prevArrivalTimeArray) => {
  const L2 = [];
  for (let i = 0; i < prevArrivalTimeArray.length; i++) {
    if (ToKoreanTime(prevArrivalTimeArray[i].prevArrivalTime) < b) {
      L2.push(prevArrivalTimeArray[i]);
    }
  }
  return L2;
};

module.exports = GetL2;
