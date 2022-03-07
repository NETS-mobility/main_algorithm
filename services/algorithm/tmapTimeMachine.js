/*
======== TmapTimeMachine =======
departureLon : 출발지 경도
departureLat : 출발지 위도
arrivalLon : 도착지 경도
arrivalLat : 도착지 위도
predictionType : 출발 시간 구하기 or 도착 시간 구하기 타입 선택
- "departure" : 출발시간 예측 길 안내.
- "arrival" : 도착시간 예측 길 안내
predictionTime : 희망 출발 시간 or 희망 도착 시간 입력
*/

const axios = require("axios");
const TmapTimeMachine = async (
  departureLon,
  departureLat,
  arrivalLon,
  arrivalLat,
  predictionType,
  predictionTime
) => {
  var headers = {};
  headers["appKey"] = "l7xxa020ecbe57d34fe9af21f362f0b1da17"; //앱키 삽입해야 함
  headers["Content-Type"] = "application/json";

  //value = "2" : 총 소요시간, 소요 거리만 확인하는 옵션
  var urlStr =
    "https://apis.openapi.sk.com/tmap/routes/prediction?version=1&reqCoordType=WGS84GEO&resCoordType=EPSG3857&format=json&totalValue=2";

  var data = JSON.stringify({
    routesInfo: {
      departure: {
        //출발지
        name: "test1",
        lon: departureLat,
        lat: departureLon,
      },
      destination: {
        //도착지
        name: "test2",
        lon: arrivalLat,
        lat: arrivalLon,
      },
      predictionType: predictionType, //출발지->도착지
      predictionTime: predictionTime, //예약 날짜, 시간 (형식 예시:2022-03-04T11:00:00+0900)
      searchOption: "01", //교통최적+무료우선 옵션 선택
    },
  });

  //예상 소요시간 계산
  let estimatedTime = 0;

  //API에서 data받아오기
  try {
    const res = await axios({
      method: "POST",
      url: urlStr,
      headers: headers,
      data: data,
    });
    estimatedTime = Math.round(res.data.features[0].properties.totalTime / 60); //tmap에서 계산한 시간에서 반올림(단위: 분)
    return estimatedTime;
  } catch (err) {
    console.log(err);
  }
};

module.exports = TmapTimeMachine;
