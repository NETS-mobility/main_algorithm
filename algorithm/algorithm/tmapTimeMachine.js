const request = require("request-promise");
const TmapTimeMachine = async (
  departureLon,
  departureLat,
  arrivalLon,
  arrivalLat,
  predictionType,
  predictionTime
) => {
  var headers = {
    "appKey": "l7xxabe561b70fd34063bb41a5d73ccfd8a4", //앱키 삽입해야 함
    "Content-Type": "application/json"
  };

  //value = "2" : 총 소요시간, 소요 거리만 확인하는 옵션
  var urlStr =
    "https://apis.openapi.sk.com/tmap/routes/prediction?version=1&reqCoordType=WGS84GEO&resCoordType=EPSG3857&format=json&totalValue=2";

  var data = {
    routesInfo: {
      departure: {
        //출발지
        name: "test1",
        lon: departureLat,
        lat: departureLon
      },
      destination: {
        //도착지
        name: "test2",
        lon: arrivalLat,
        lat: arrivalLon
      },
      predictionType: predictionType, //출발지->도착지
      predictionTime: predictionTime, //예약 날짜, 시간
      searchOption: "01", //교통최적+무료우선 옵션 선택
    },
  };

  //예상 소요시간 계산
  let estimatedTime = 0;
  //예상 소요거리 계산
  let estimatedDistance = 0;

  //API에서 data받아오기
  await request.post({
    headers: headers,
    url: urlStr,
    body: data,
    json: true
  }, function(error, response, body) {
    estimatedTime = Math.round(response.body.features[0].properties.totalTime / 60); //tmap에서 계산한 시간에서 반올림(단위: 분)
    estimatedDistance = response.body.features[0].properties.totalDistance;
  });

  return {
    estimatedTime: estimatedTime,
    estimatedDistance: estimatedDistance,
  };
};

module.exports = TmapTimeMachine;
