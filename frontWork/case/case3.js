import GetDispatchResult from "../algorithm/getDispatchResult";
import GetEstimatedTime from "../algorithm/getEstimatedTime";
import GetPickupTime from "../algorithm/getPickupTime";
import GetPrevDepartureTime from "../algorithm/getPrevDepartureTime";
import GetDispatchAvailableCar from "../algorithm/getDispatchAvailableCar";
import GetL1 from "../algorithm/getL1";
import GetL2 from "../algorithm/getL2";
import AddMinuteToDate from "../util/addMinuteToDate";
import ToKoreanTime from "../util/toKoreanTime";

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

  let pickupTime, prevDepartureTimeArray;
  let L1, L2, L3;
  let hos_arr_time = rev_date + "T" + old_hos_arr_time + "+0900";
  let hos_dep_time = rev_date + "T" + old_hos_dep_time + "+0900";

  let toHosEstimated = await GetEstimatedTime(
    { lon: pickup_y, lat: pickup_x },
    { lon: hos_y, lat: hos_x },
    "집-병원",
    hos_arr_time,
    service_kind_id
  ).then((res) => res);

  let toHosEstimatedTime = toHosEstimated.time;
  let toHosEstimatedDist = toHosEstimated.dist;

  pickupTime = GetPickupTime(hos_arr_time, toHosEstimatedTime);

  L1 = GetL1(toHosEstimatedTime, pickupTime);

  prevDepartureTimeArray = await GetPrevDepartureTime(
    L1,
    pickup_x,
    pickup_y,
    ToKoreanTime(new Date(pickupTime))
  ).then((res) => res);

  L2 = GetL2(prevDepartureTimeArray);

  let toHomeEstimated = await GetEstimatedTime(
    { lon: hos_y, lat: hos_x },
    { lon: drop_y, lat: drop_x },
    "병원-집",
    hos_dep_time,
    service_kind_id
  ).then((res) => res);
  let toHomeEstimatedTime = toHomeEstimated.time;
  let toHomeEstimatedDist = toHomeEstimated.dist;

  L3 = await GetDispatchAvailableCar(
    L2,
    drop_x,
    drop_y,
    AddMinuteToDate(new Date(hos_dep_time), toHomeEstimatedTime / 60000)
  ).then((res) => res);

  const ResultData = {
    dispatch: GetDispatchResult(L3),
    expect_pickup_time: pickupTime,
    expect_terminate_service_time: ToKoreanTime(
      AddMinuteToDate(new Date(hos_dep_time), toHomeEstimatedTime / 60000)
    ),
    expect_move_distance: (toHomeEstimatedDist + toHosEstimatedDist) / 1000, //GetEstimatedTime돌렸을 때 나온 총 거리
    expect_move_time: (toHomeEstimatedTime + toHosEstimatedTime) / 60000, //estimatedTime
  };

  if (ResultData.dispatch == -1) {
    return -1;
  } else {
    console.log(ResultData);
    return ResultData; //최종 배차된 차의 car_id
  }
};

export default Case3;
