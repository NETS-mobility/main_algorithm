const Data = require("../module/reservation.json"); //예약 정보 json 파일
const TwoWayData = require("../module/twoWay.json"); //왕복일 경우, 첫 번째 호출인지 두 번째 호출인지 구분하기 위함
const TmapTimeMachine = require("../module/tmapTimeMachine.js"); //tmap 타임머신 경로 찾기
const PreData = require("../module/preReservation.json"); //이전 예약된 정보 json 파일
const CarData = require("../module/car.json"); //차량 정보 json 파일

//서비스 id 이용해서 예약 정보 가져오기
const GetReservation = async (id) => {
  const X = Data.reservation[id]?.service == "basic" ? 10 : 20; //서비스 타입에 따라 정리 시간(X) 계산
  const idx = TwoWayData.twoWay.findIndex((i) => i.id == id);
  const idx2 = Data.reservation.findIndex((i) => i.id == id);
  const L1 = [];
  const L2 = [];
  const L3 = [];

  //case1: 편도(자택->병원)
  if (idx2 != -1) {
    const reservation = Data.reservation[idx2];
    if (reservation.way == "to hospital") {
      let a1 = 0,
        b1 = 0;
      await TmapTimeMachine(
        reservation?.departureLon,
        reservation?.departureLat,
        reservation?.arrivalLon,
        reservation?.arrivalLat,
        "arrival",
        reservation?.hospitalArrival
      ).then((tmapTime) => {
        a1 = tmapTime + 20 + X; //a1
      });
      const resDate = new Date(reservation.hospitalArrival);
      a1 = a1 * 60000; //minutes -> milliseconds
      b1 = new Date(resDate - a1);

      let prevEnd = 0,
        nextStart = 0;
      // 반복문
      if (prevEnd < b1 && nextStart > a1) {
        L1.push("차량ID");
      }

      for (let i = 0; i < L1.length; i++) {
        const prevPlace = L1[i].prevPlace;
        TmapTimeMachine(
          prevPlace?.lon,
          prevPlace?.lat,
          reservation?.departureLon,
          reservation?.departureLat,
          "arrival",
          prevPlace.endTime //이전예약 끝나는 시간
        ).then((tmapTime) => {
          c1 = tmapTime + 20;
          if (b1 > c1) L2.push("차량ID");
        });
      }

      for (let i = 0; i < L2.length; i++) {
        const nextPlace = L2[i].nextPlace;
        TmapTimeMachine(
          reservation?.arrivalLon,
          reservation?.arrivalLat,
          nextPlace.lon,
          nextPlace.lat,
          "departure",
          nextPlace.startTime //다음 예약 시작 시간
        ).then((tmapTime) => {
          d1 = tmapTime;
          if (c1 < d1) L3.push("차량 ID");
        });
      }
      //여기까지 반복문

      if (L3.length == 0) {
        return "배차 불가";
      } else {
        let minC1 = L3[0].c1;
        let carResult = L3[0];
        for (let i = 1; i < L3.length; i++) {
          if (minC1 > L3[i].c1) {
            minC1 = L3[i].c1;
            carResult = L3[i];
          }
        }
      }
    }
  }
};

module.exports = GetReservation;
