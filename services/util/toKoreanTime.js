/*
======== ToKoreanTime =======
받은 Date을 tmapTimeMachine의 인자로 사용할 수 있는 형식으로 변환
Fri Mar 04 2022 11:45:00 GMT+0900 => 2022-03-04T11:45:00.000Z

return {
  ISO 형식 시간(ex. 2022-03-07T11:00:00.000Z)
}
*/

const ToKoreanTime = (time) => {
  return new Date(
    time.getTime() - time.getTimezoneOffset() * 60000
  ).toISOString();
};

module.exports = ToKoreanTime;
