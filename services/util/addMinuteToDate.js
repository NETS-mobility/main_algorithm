/*
======== AddMinuteToDate =======
Date 객체에 시간(분)을 더해 새로운 Date 객체 반환
(ex. 2022-03-07 11:00:00에 30분을 더할 때 사용 가능)

return {
  Date 객체
}
*/

const AddMinuteToDate = (dt, minute) => {
  return new Date(dt.getTime() + minute * 60000);
};

module.exports = AddMinuteToDate;
