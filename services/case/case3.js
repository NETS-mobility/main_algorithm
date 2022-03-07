const GetDispatchResult = require("../algorithm/GetDispatchResult");
const GetEstimatedTime = require("../algorithm/GetEstimatedTime");
const GetPickupTime = require("../algorithm/GetPickupTime");
const GetPrevArrivalTime = require("../algorithm/GetPrevArrivalTime");
const GetDispatchAvailableCar = require("../algorithm/GetDispatchAvailableCar");
const GetL1 = require("../algorithm/GetL1");
const GetL2 = require("../algorithm/GetL2");
const AddMinuteToDate = require("../util/addMinuteToDate");

const Case3 = async (testData) => {
  const {
    pickup_x,
    pickup_y,
    drop_x,
    drop_y,
    hos_x,
    hos_y,
    old_hos_arr_time,
    old_hos_dep_time,
    rev_date,
    service_kind_id,
  } = testData;

  let toHosEstimatedTime, pickupTime, prevArrivalTimeArray, toHomeEstimatedTime;
  let L1, L2, L3;
  let dispatch;
  let hos_arr_time = rev_date + "T" + old_hos_arr_time + "+0900";
  let hos_dep_time = rev_date + "T" + old_hos_dep_time + "+0900";

  toHosEstimatedTime = await GetEstimatedTime(
    { lon: pickup_y, lat: pickup_x },
    { lon: hos_y, lat: hos_x },
    "집-병원",
    hos_arr_time,
    service_kind_id
  ).then((res) => res);
  console.log("case3 toHosEstimatedTime==", toHosEstimatedTime);

  pickupTime = GetPickupTime(hos_arr_time, toHosEstimatedTime);
  console.log("case3 pickupTime==", pickupTime);

  L1 = GetL1(toHosEstimatedTime, pickupTime);
  console.log("case3 L1==", L1);

  prevArrivalTimeArray = await GetPrevArrivalTime(L1, pickup_x, pickup_y).then(
    (res) => res
  );
  console.log("case3 prevArrivalTimeArray==", prevArrivalTimeArray);

  L2 = GetL2(pickupTime, prevArrivalTimeArray);
  console.log("case3 L2==", L2);

  toHomeEstimatedTime = await GetEstimatedTime(
    { lon: hos_y, lat: hos_x },
    { lon: drop_y, lat: drop_x },
    "병원-집",
    hos_dep_time,
    service_kind_id
  ).then((res) => res);
  console.log("case3 toHomeEstimatedTime==", toHomeEstimatedTime);

  L3 = await GetDispatchAvailableCar(
    L2,
    drop_x,
    drop_y,
    AddMinuteToDate(new Date(hos_dep_time), toHomeEstimatedTime / 60000)
  ).then((res) => res);
  console.log("case3 L3==", L3);

  dispatch = GetDispatchResult(L3);
  console.log("case3 dispatch==", dispatch);

  if (dispatch == -1) {
    return -1;
  } else {
    return dispatch[0].car_id; //최종 배차된 차의 car_id
  }
};

module.exports = Case3;
