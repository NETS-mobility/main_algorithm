const express = require("express");
const router = express.Router();
const GetA = require("../services/getA.js");
const GetL1 = require("../module/getL1.js");
const GetL2 = require("../module/getL2.js");
const GetB = require("../services/getB.js");
const GetD = require("../services/getD.js");
const GetResult = require("../services/getResult.js");
const Func = require("../");

/*
    dire,
    pickup_x,
    pickup_y,
    drop_x,
    drop_y,
    hos_x,
    hos_y,
    pickup_time,
    hos_arr_time, //희망
    hos_dep_time, //희망
    rev_date,
    gowithHospitalTime,

 * 이전 예약시간: prev_terminate_time = 2022-03-04 11:00:00
 * 다음 예약시간: post_pickup_time = 2022-03-04 17:00:00
 * 이전 예약장소 x: prev_last_x = 126.937838
 * 이전 예약장소 y: prev_last_y = 37.5535483
 * 다음 예약장소 x: post_first_x = 126.922458
 * 다음 예약장소 y: post_first_y = 37.5861458
*/

// ===== 예약 정보 받아오기 =====
router.post("/getRev", async function (req, res, next) {
  const {
    dire,
    pickup_x,
    pickup_y,
    drop_x,
    drop_y,
    hos_x,
    hos_y,
    pickup_time,
    hos_arr_time, //희망
    hos_dep_time, //희망
    rev_date,
    gowithHospitalTime,
  } = req.body;

  // 변수 저장 코드 //
  console.log(req.body);
  ///////////////////

  let isOverPoint = 0;
  if (gowithHospitalTime > 120) {
    isOverPoint = 1; // 2시간 초과
  }

  let a, b, cArr, d;
  let L1, L2, L3;

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
    b = GetB(hos_arr_time, a);
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

  res.status(200).send();
});

module.exports = router;
