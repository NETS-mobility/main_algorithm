/*
======== GetDispatchResult =======
최종 배차 가능한 car_id들을 인자(L3)로 받아 sort함
(현재 예약 시간에서 prevArrivalTime이 가장 가까운 순서대로 sort함)

if(L3가 빈 배열이면) return -1
else{
return  {
  car_id: "차량ID", 
  prevArrivalTime: "이전 예약에서 현재 예약으로 출발하는 시간(추후 배차 우선순위 정할 때 사용)"
  }
}
*/

const GetDispatchResult = (L3) => {
  if (L3.length == 0) {
    return -1;
  }
  const opt = L3.sort(function (a, b) {
    return b.prevArrivalTime - a.prevArrivalTime;
  });

  return opt;
};

module.exports = GetDispatchResult;
