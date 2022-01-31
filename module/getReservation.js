const Data = require("./reservation.json"); //예약 정보 json 파일
const TwoWayData = require("./twoWay.json"); //왕복일 경우, 첫 번째 호출인지 두 번째 호출인지 구분하기 위함
const TmapTimeMachine = require("./tmap.js"); //tmap 타임머신 경로 찾기
const PreData = require("./preReservation.json"); //이전 예약된 정보 json 파일
const CarData = require("./car.json"); //차량 정보 json 파일

//서비스 id 이용해서 예약 정보 가져오기
const GetReservation = async (id) => {
  const X = Data.reservation[id]?.service == "basic" ? 10 : 20; //서비스 타입에 따라 정리 시간(X) 계산
  const way = Data.reservation[id]?.way; //왕복인지, 편도인지, 편도라면 어떤 방향인지 나타내는 변수
  const idx = TwoWayData.twoWay.findIndex((i) => i.id == id);
  const idx2 = Data.reservation.findIndex((i) => i.id == id);

  //case1: 편도(자택->병원)
  if(way=="to hospital"){
    if (idx2 != -1) {
      let a1 = 0, b1 = 0, c1 = 0, d1 = 0;
      const reservation=Data.reservation[idx2];
      await TmapTimeMachine(reservation?.departureLon,reservation?.departureLat,reservation?.arrivalLon,reservation?.arrivalLat,"arrival",reservation?.hospitalArrival).then((tmapTime) => {
        a1 = tmapTime + 20 + X; //a1
      });
      b1 = reservation.hospitalArrival - a1;
      
      //--------여기서부터 시작!
      // CarData.
      // for(car){
      //   for(res)
      // }
      // for()
      // await TmapTimeMachine()
    }
  }

  // //편도(자택->병원)이거나 왕복 첫 번째 호출된 경우
  // if (
  //   way == "to hospital" ||
  //   (idx != -1 && TwoWayData.twoWay[idx]?.step == 0)
  // ) {
  //   //예약 정보가 유효할 때 Tmap 타임머신 경로 찾기로 예상 소요시간 계산
  //   if (idx2 != -1) {
  //     let TmapTime = 0;
  //     await TmapTimeMachine(Data.reservation[idx2]).then((tmapTime) => {
  //       TmapTime = tmapTime + 20 + a; //소요시간 b 계산
  //     });
  //     return true;
  //   }
  // }

  // //편도(병원->자택)이거나 왕복 두 번째 호출된 경우
  // //아직 작업하기 전임
  // else {
  //   if (idx2 != -1) {
  //     let TmapTime = 0;
  //     await TmapTimeMachine(Data.reservation[idx2]).then((tmapTime) => {
  //       TmapTime = tmapTime + 20 + a; //소요시간 b 계산
  //     });
  //     return false;
  //   }
  // }
};

module.exports = GetReservation;
