//알고리즘 메인 파일
// const GetReservation = require("./module/getReservation");
// const getL1 = require("./module/getL1");
// const TmapTimeMachine = require("./module/tmap");

// GetReservation(1);
// const GetA = require("./services/getA");
// const GetL1 = require("./module/getL1.js");
// const GetL2 = require("./module/getL2.js");
// const GetB = require("./services/getB.js");
// const GetD = require("./services/getD.js");
// const GetResult = require("./services/getResult.js");

// const { default: axios } = require("axios");
import axios from "axios";
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
        lon: departureLon,
        lat: departureLat,
      },
      destination: {
        //도착지
        name: "test2",
        lon: arrivalLon,
        lat: arrivalLat,
      },
      predictionType: predictionType, //출발지->도착지
      predictionTime: predictionTime, //예약 날짜, 시간
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

const GetL1 = async (a1, b1) => {
  return [{ car_id: 11 }, { car_id: 22 }, { car_id: 33 }, { car_id: 44 }];
};

const GetL2 = (b, cArr) => {
  const L2 = [];
  for (let i = 0; i < cArr.length; i++) {
    if (cArr[i].c < b) {
      L2.push(cArr[i]);
    }
  }
  return L2;
};

const GetA = async (departure, arrival, way, hosTime) => {
  let moveType = "";
  let a = 0;

  if (way == "집-병원") {
    moveType = "arrival";
  } else {
    moveType = "departure";
  }

  await TmapTimeMachine(
    departure?.lon,
    departure?.lat,
    arrival?.lon,
    arrival?.lat,
    moveType,
    hosTime
  ).then((tmapTime) => {
    a = tmapTime + 20 + GetArrangeTime(); //a1
  });
  a = a * 60000; //minutes -> milliseconds
  return a;
};

const GetB = (hosTime, a) => {
  const resDate = new Date(hosTime);
  b = new Date(resDate - a);
  return b;
};

const GetResult = (L3, cArr) => {
  if (L3.length == 0) {
    return -1;
  }
  const filteredArr = cArr.filter((id) => id == L3.id);
  const opt = filteredArr.sort(function (a, b) {
    return a.c - b.c;
  });
  return opt;
};

const GetD = (L2, drop_x, drop_y) => {
  const L3 = [];
  for (let i = 0; i < L2.length; i++) {
    //const nextRes = Func(L2[i].car_id);
    TmapTimeMachine(
      drop_y,
      drop_x,
      nextRes.post_first_y,
      nextRes.post_first_x,
      "departure",
      nextRes.post_pickup_time //다음 예약 시작 시간
    ).then((tmapTime) => {
      const resDate = new Date(nextRes.post_pickup_time);
      d = new Date(resDate - tmapTime);
      if (L2[i].c < d) L3.push(L2[i].car_id);
    });
  }
  return L3;
};

// ===== 예약 정보 클라이언트에서 받아오기 =====
const Main = () => {
  const dire = "집-병원";
  const pickup_x = 127.078202;
  const pickup_y = 37.618934;
  const drop_x = 0;
  const drop_y = 0;
  const hos_x = 127.034464;
  const hos_y = 37.5068891;
  const pickup_time = "14:00:00";
  const old_hos_arr_time = "15:00:00";
  const old_hos_dep_time = "";
  const rev_date = "2022-03-04";
  const gowithHospitalTime = 0;
  const prev_terminate_time = "2022-03-04 11:00:00";
  const post_pickup_time = "2022-03-04 17:00:00";
  const prev_last_x = 126.937838;
  const prev_last_y = 37.5535483;
  const post_first_x = 126.922458;
  const post_first_y = 37.5861458;

  let isOverPoint = 0;
  if (gowithHospitalTime > 120) {
    isOverPoint = 1; // 2시간 초과
  }

  let hos_arr_time = rev_date + old_hos_arr_time;
  let hos_dep_time = rev_date + old_hos_dep_time;

  let a, b, cArr, d;
  let L1, L2, L3;

  console.log("dire===,", dire);

  if (dire == "집-집") {
    if (isOverPoint) {
      //case 4
      a1 = GetA(
        { lon: pickup_y, lat: pickup_x },
        { lon: hos_y, lat: hos_x },
        hos_arr_time
      );
      b1 = GetB(hos_arr_time, a1);
      L11 = GetL1(a1, b1);
      cArr1 = GetC(L11, pickup_x, pickup_y);
      L21 = GetL2(b1, cArr1);
      L31 = GetD(L21, drop_x, drop_y);

      a2 = GetA(
        { lon: pickup_y, lat: pickup_x },
        { lon: drop_y, lat: drop_x },
        hos_dep_time
      );
      b2 = hos_dep_time;
      L12 = GetL1(a2, b2);
      cArr2 = GetC(L12, hos_x, hos_y);
      L22 = GetL2(b2, cArr2);
      L32 = GetD(L22, drop_x, drop_y);

      if (L31.length != 0 && L32.length != 0) {
      }
    } else {
      //case 3
      a = GetA(
        { lon: pickup_y, lat: pickup_x },
        { lon: hos_y, lat: hos_x },
        hos_arr_time
      );
      b = GetB(hos_arr_time, a);
      L1 = GetL1(a, b);
      cArr = GetC(L1, pickup_x, pickup_y);
      L2 = GetL2(b, cArr);
      d = GetA(
        { lon: hos_y, lat: hos_x },
        { lon: drop_y, lat: drop_x },
        hos_dep_time
      );
      L3 = GetD(L2, drop_x, drop_y);
      L4 = GetL2(d, L3);
      dispatch = GetResult(L4, L2);
      return dispatch[0].car_id; //최종 배차된 차의 car_id
    }
  } else if (dire == "집-병원") {
    //case 1
    a = GetA(
      { lon: pickup_y, lat: pickup_x },
      { lon: drop_y, lat: drop_x },
      hos_arr_time
    );
    console.log("a==", a);
    b = GetB(hos_arr_time, a);
    // console.log("b==", b);
    L1 = GetL1(a, b);
    cArr = GetC(L1, pickup_x, pickup_y);
    L2 = GetL2(b, cArr);
    L3 = GetD(L2, drop_x, drop_y);
    dispatch = GetResult(L3, cArr);
    return dispatch[0].car_id; //최종 배차된 차의 car_id
  } else if (dire == "병원-집") {
    //case 2
    a = GetA(
      { lon: pickup_y, lat: pickup_x },
      { lon: drop_y, lat: drop_x },
      hos_dep_time
    );
    b = hos_dep_time;
    L1 = GetL1(a, b);
    cArr = GetC(L1, hos_x, hos_y);
    L2 = GetL2(b, cArr);
    L3 = GetD(L2, drop_x, drop_y);
    dispatch = GetResult(L3, cArr);
    return dispatch[0].car_id; //최종 배차된 차의 car_id
  }

  // res.status(200).send();
};

debugger;
Main();
module.exports = Main;
