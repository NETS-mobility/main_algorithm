/*
======== GetPickupTime =======
현재 예약의 픽업장소에 도착해야하는 시간을 구한다.

return{
  b(현재 예약 픽업 시간) (예시: 2022-03-04T13:32:00.000Z)
}
*/

const ToKoreanTime = require("../util/toKoreanTime");
const GetPickupTime = (hosTime, a) => {
  const resDate = new Date(hosTime);
  const b = new Date(resDate - a); //(병원 도착 시간) - (집-병원 예상 소요 시간)
  return ToKoreanTime(b);
};

module.exports = GetPickupTime;
