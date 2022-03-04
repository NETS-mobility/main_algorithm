const express = require("express");
const router = express.Router();
const GetA = require("../services/a1.js");
const GetL1 = require("../module/getL1.js");
const GetL2 = require("../module/getL2.js");
const GetB = require("../services/getB.js");
const GetD = require("../services/getD.js");
const GetResult = require("../services/getResult.js");
const Func = require("../");

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
      L11 = await GetL1(a1, b1, rev_date);
      cArr1 = GetC(L11, pickup_x, pickup_y);
      L21 = GetL2(b1, cArr1);
      L31 = GetD(L21, drop_x, drop_y);

      a2 = GetA(
        { lon: pickup_y, lat: pickup_x },
        { lon: drop_y, lat: drop_x },
        hos_dep_time
      );
      b2 = hos_dep_time;
      L12 = await GetL1(a2, b2, rev_date);
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
      L1 = await GetL1(a, b, rev_date);
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
    L1 = await GetL1(a, b, rev_date);
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
    L1 = await GetL1(a, b, rev_date);
    cArr = GetC(L1, hos_x, hos_y);
    L2 = GetL2(b, cArr);
    L3 = GetD(L2, drop_x, drop_y);
    dispatch = GetResult(L3, cArr);
    return dispatch[0].car_id; //최종 배차된 차의 car_id
  }

  res.status(200).send();
});

module.exports = router;
