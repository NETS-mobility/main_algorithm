const GetDispatchResult = require("../algorithm/GetDispatchResult");
const GetEstimatedTime = require("../algorithm/GetEstimatedTime");
const GetPrevArrivalTime = require("../algorithm/GetPrevArrivalTime");
const GetDispatchAvailableCar = require("../algorithm/GetDispatchAvailableCar");
const GetL1 = require("../algorithm/GetL1");
const GetL2 = require("../algorithm/GetL2");
const ToKoreanTime = require("../util/toKoreanTime");
const AddMinuteToDate = require("../util/addMinuteToDate");

//병원-집
const Case2 = async (testData) => {
  const {
    dire,
    drop_x,
    drop_y,
    hos_x,
    hos_y,
    old_hos_dep_time,
    rev_date,
    service_kind_id,
  } = testData;

  let estimatedTime, pickupTime, prevArrivalTimeArray;
  let L1, L2, L3;
  let dispatch;
  let hos_dep_time = rev_date + "T" + old_hos_dep_time + "+0900";

  estimatedTime = await GetEstimatedTime(
    { lon: hos_y, lat: hos_x },
    { lon: drop_y, lat: drop_x },
    dire,
    hos_dep_time,
    service_kind_id
  ).then((res) => res);
  console.log("case2 estimatedTime==", estimatedTime);

  pickupTime = ToKoreanTime(new Date(hos_dep_time));
  console.log("case2 pickupTime==", pickupTime);

  L1 = GetL1(estimatedTime, pickupTime);
  console.log("case2 L1==", L1);

  prevArrivalTimeArray = await GetPrevArrivalTime(L1, hos_x, hos_y).then(
    (res) => res
  );
  console.log("case2 prevArrivalTimeArray==", prevArrivalTimeArray);

  L2 = GetL2(pickupTime, prevArrivalTimeArray);
  console.log("case2 L2==", L2);

  L3 = await GetDispatchAvailableCar(
    L2,
    drop_x,
    drop_y,
    AddMinuteToDate(new Date(hos_dep_time), estimatedTime / 60000)
  ).then((res) => res);
  console.log("case2 L3==", L3);

  dispatch = GetDispatchResult(L3);
  console.log("case2 dispatch==", dispatch);

  if (dispatch == -1) {
    return -1;
  } else {
    return dispatch[0].car_id; //최종 배차된 차의 car_id
  }
};

module.exports = Case2;
