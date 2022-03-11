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
      //car_id = 3-1
      //prev: 연세대학교 신촌세브란스병원
      //post: 여의도공원
      prev_terminate_time: "2022-03-04T11:00:00+0900",
      post_pickup_time: "2022-03-04T18:20:00+0900",
      prev_last_x: 126.94103179168812,
      prev_last_y: 37.56268383011834,
      post_first_x: 126.92151844732145,
      post_first_y: 37.52587518239515,
    },
    {
      //car_id = 3-2
      //prev: 명지병원
      //post: 연신내역
      prev_terminate_time: "2022-03-04T12:00:00+0900",
      post_pickup_time: "2022-03-04T19:40:00+0900",
      prev_last_x: 126.82896180962184,
      prev_last_y: 37.646893316065714,
      post_first_x: 126.92000901050096,
      post_first_y: 37.61896005077948,
    },
    {
      //car_id = 3-3
      //prev: 상계주공16단지 아파트
      //post: 개화산역 근처
      prev_terminate_time: "2022-03-04T15:00:00+0900",
      post_pickup_time: "2022-03-04T21:00:00+0900",
      prev_last_x: 127.05209935813014,
      prev_last_y: 37.66871697881065,
      post_first_x: 126.808773,
      post_first_y: 37.5732841,
    },
    {
      //car_id = 3-4
      //prev: LH 판교제2테크노밸리 기업성장센터
      //post: 가톨릭 성모 병원
      prev_terminate_time: "2022-03-04T09:00:00+0900",
      post_pickup_time: "2022-03-04T18:00:00+0900",
      prev_last_x: 127.09525516980818,
      prev_last_y: 37.41073497356564,
      post_first_x: 127.00478767344177,
      post_first_y: 37.50774002611129,
    },
  ];

  //11
  //22
  if (i == 11) {
    return cars[0];
  } else if (i == 22) {
    return cars[1];
  } else if (i == 33) {
    return cars[2];
  } else {
    return cars[3];
  }

  // const cars = [
  //   {
  //     //이전예약 이후예약 둘 다 있음
  //     prev_terminate_time: "2022-03-04T11:00:00+0900",
  //     post_pickup_time: "2022-03-04T22:00:00+0900",
  //     prev_last_x: 126.937838,
  //     prev_last_y: 37.5535483,
  //     post_first_x: 126.922458,
  //     post_first_y: 37.5861458,
  //   },
  //   {
  //     //이전예약만 있음 //차고지: 은평구
  //     prev_terminate_time: "2022-03-04T12:00:00+0900",
  //     post_pickup_time: "2022-03-04T15:10:00+0900",
  //     prev_last_x: 127.158584,
  //     prev_last_y: 37.6060423,
  //     post_first_x: 126.92000901050096,
  //     post_first_y: 37.61896005077948,
  //   },
  //   {
  //     //이후예약만 있음 //차고지: 노원구
  //     prev_terminate_time: "2022-03-04T15:00:00+0900",
  //     post_pickup_time: "2022-03-04T22:00:00+0900",
  //     prev_last_x: 127.06192797533434,
  //     prev_last_y: 37.656817479715386,
  //     post_first_x: 126.808773,
  //     post_first_y: 37.5732841,
  //   },
  //   {
  //     //이전예약 이후예약 둘 다 없음 //차고지: 서초구
  //     prev_terminate_time: "2022-03-04T09:00:00+0900",
  //     post_pickup_time: "2022-03-04T22:00:00+0900",
  //     prev_last_x: 127.02519982583827,
  //     prev_last_y: 37.496103424049124,
  //     post_first_x: 127.02519982583827,
  //     post_first_y: 37.496103424049124,
  //   },
  // ];
  return cars[i];
};

export default Func;
