const Data = require("../module/reservation.json"); //예약 정보 json 파일
const TwoWayData = require("../module/twoWay.json"); //왕복일 경우, 첫 번째 호출인지 두 번째 호출인지 구분하기 위함
const TmapTimeMachine = require("../module/tmapTimeMachine.js"); //tmap 타임머신 경로 찾기
const GetArrangeTime = require("./getArrangeTime.js");
//a (출발지, 목적지)
//자택->병원 예상 소요시간
//병원->자택 예상 소요시간

// api 파일에서
// 프론트로부터 예약 정보를 받아서
// GetA~GetD까지 해서 배차 돌리기

/*
[return 값]
1. 배차 성공 여부
2-1. 실패 -> 끝
2-1. 성공 -> carid, expect를 프론트에게 반환
*/

//결제 전에 배차를 돌린다.
//결제가 끝나야만 reservation 테이블에 삽입을 할 수 있다.
//1안) reservation_wait 테이블을 만들어서 배차만 완료된 걸 보관
//    -> (배차 알고리즘을 돌리기 전에 백엔드에서 예약 번호를 만들어야 함)
//    -> 만약 배차 완료되었지만, 결제가 되지 않은채로 끝난 건이 있다면? -> 안고가자

//2안) 그냥 carid, expect를 프론트에게 반환 -> 최지우식 해결법 편하게 가자

//3안) reservation_state_id를 이용해서 배차만 완료된 건 0, 결제까지 완료된 건 1로 설정.
//    -> reservation_state_id가 0인 걸 매일 오전 12시에 삭제(어제까지의 예약 중에서만 삭제) (오늘 12시에 예약하고 있는 사람이 있을 수도 있으므로)

//서비스 id 이용해서 예약 정보 가져오기
const GetA = async (departure, arrival) => {
  // const X = Data.reservation[id]?.service == "basic" ? 10 : 20; //서비스 타입에 따라 정리 시간(X) 계산
  //case1: 편도(자택->병원)

  //   const reservation = Data.reservation[idx2];
  if (reservation.way == "to hospital") {
    let a1 = 0;
    await TmapTimeMachine(
      departure?.lon,
      departure?.lat,
      arrival?.lon,
      arrival?.lat,
      "arrival",
      reservation?.hospitalArrival
    ).then((tmapTime) => {
      a1 = tmapTime + 20 + GetArrangeTime(); //a1
    });
    const resDate = new Date(reservation.hospitalArrival);
    a1 = a1 * 60000; //minutes -> milliseconds
  }
  //}
};
module.exports = GetReservation;
