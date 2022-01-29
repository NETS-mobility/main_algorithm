// https://apis.openapi.sk.com/tmap/routes/prediction?version={1}&callback={callback} -> 타임머신 자동차 길 안내
// version == API 버전 정보
// resCoordType == 응답 좌표계 유형
// reqCoordType == 요청 좌표계 유형
// sort == 지리정보 개체 정렬순서
// callback ==
// totalValue == 응답 결과

const { default: axios } = require("axios");
const TmapTimeMachine = async (addr) => {
  var headers = {};
  headers["appKey"] = "YOUR_APP_KEY"; //앱키 삽입해야 함
  headers["Content-Type"] = "application/json";

  //value = "2" : 총 소요시간, 소요 거리만 확인하는 옵션
  var urlStr =
    "https://apis.openapi.sk.com/tmap/routes/prediction?version=1&reqCoordType=WGS84GEO&resCoordType=EPSG3857&format=json&totalValue=2";

  const departureLon = addr?.departureLon; //출발지 위도
  const departureLat = addr?.departureLat; //출발지 경도
  const arrivalLat = addr?.arrivalLat; //도착지 위도
  const arrivalLon = addr?.arrivalLon; //도착지 경도

  var data = JSON.stringify({
    routesInfo: {
      departure: {
        //출발지
        name: "test1",
        lon: departureLon,
        lat: departureLat,
      },
      destination: {
        //도착지
        name: "test2",
        lon: arrivalLon,
        lat: arrivalLat,
      },
      predictionType: "departure", //출발지->도착지
      predictionTime: "2022-01-30T12:28:22+0900", //예약 날짜, 시간
      wayPoints: {
        wayPoint: [
          {
            lon: "126.98261605850641",
            lat: "37.57528380389962",
          },
          {
            lon: "126.98773907773705",
            lat: "37.56611469775449",
          },
        ],
      },
      searchOption: "01", //교통최적+무료우선 옵션 선택
    },
  });

  //예상 소요시간 계산
  let predictedTime = 0;

  //API에서 data받아오기
  try {
    const res = await axios({
      method: "POST",
      url: urlStr,
      headers: headers,
      data: data,
    });
    predictedTime = Math.round(res.data.features[0].properties.totalTime / 60); //tmap에서 계산한 시간에서 반올림(단위: 분)
    return predictedTime;
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

module.exports = TmapTimeMachine;
