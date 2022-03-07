/*
 * 이전 예약시간: prev_terminate_time
 * 다음 예약시간: post_pickup_time
 * 이전 예약장소 x: prev_last_x
 * 이전 예약장소 y: prev_last_y
 * 다음 예약장소 x: post_first_x
 * 다음 예약장소 y: post_first_y
 */

const Func = (i) => {
  //prev_예약이 없다면, 근무 시작 시간을 줘야 함 +
  //post_예약이 없다면, 근무 종료 시간을 줘야 함
  const cars = [
    {
      //이전예약 이후예약 둘 다 있음
      prev_terminate_time: "2022-03-04T11:00:00+0900",
      post_pickup_time: "2022-03-04T22:00:00+0900",
      prev_last_x: 126.937838,
      prev_last_y: 37.5535483,
      post_first_x: 126.922458,
      post_first_y: 37.5861458,
    },
    {
      //이전예약만 있음 //차고지: 은평구
      prev_terminate_time: "2022-03-04T12:00:00+0900",
      post_pickup_time: "2022-03-04T15:10:00+0900",
      prev_last_x: 127.158584,
      prev_last_y: 37.6060423,
      post_first_x: 126.92000901050096,
      post_first_y: 37.61896005077948,
    },
    {
      //이후예약만 있음 //차고지: 노원구
      prev_terminate_time: "2022-03-04T15:00:00+0900",
      post_pickup_time: "2022-03-04T22:00:00+0900",
      prev_last_x: 127.06192797533434,
      prev_last_y: 37.656817479715386,
      post_first_x: 126.808773,
      post_first_y: 37.5732841,
    },
    {
      //이전예약 이후예약 둘 다 없음 //차고지: 서초구
      prev_terminate_time: "2022-03-04T09:00:00+0900",
      post_pickup_time: "2022-03-04T22:00:00+0900",
      prev_last_x: 127.02519982583827,
      prev_last_y: 37.496103424049124,
      post_first_x: 127.02519982583827,
      post_first_y: 37.496103424049124,
    },
  ];
  return cars[i];
};

export default Func;
