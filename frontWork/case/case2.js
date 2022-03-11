import GetDispatchResult from "../algorithm/getDispatchResult";
import GetEstimatedTime from "../algorithm/getEstimatedTime";
import GetPrevDepartureTime from "../algorithm/getPrevDepartureTime";
import GetDispatchAvailableCar from "../algorithm/getDispatchAvailableCar";
import GetL1 from "../algorithm/getL1";
import GetL2 from "../algorithm/getL2";
import ToKoreanTime from "../util/toKoreanTime";
import AddMinuteToDate from "../util/addMinuteToDate";

const Case2 = async (testData, isCase2) => {
  const {
    dire,
    drop_x,
    drop_y,
    hos_x,
    hos_y,
    old_hos_dep_time,
    gowithHospitalTime,
    rev_date,
    service_kind_id,
  } = testData;

  let pickupTime, prevDepartureTimeArray;
  let L1, L2, L3;

  let hos_dep_time = rev_date + "T" + old_hos_dep_time + "+0900";
  let gowithTime = 0;
  if (isCase2) {
    gowithTime = gowithHospitalTime;
  }

  let estimatedData = await GetEstimatedTime(
    { lon: hos_y, lat: hos_x },
    { lon: drop_y, lat: drop_x },
    dire,
    hos_dep_time,
    service_kind_id
  ).then((res) => res);
  let estimatedTime = estimatedData.time;
  let estimatedDist = estimatedData.dist;

  pickupTime = ToKoreanTime(
    AddMinuteToDate(new Date(hos_dep_time), -gowithTime)
  );

  L1 = GetL1(estimatedTime, pickupTime);

  prevDepartureTimeArray = await GetPrevDepartureTime(
    L1,
    hos_x,
    hos_y,
    ToKoreanTime(new Date(pickupTime))
  ).then((res) => res);

  L2 = GetL2(prevDepartureTimeArray);

  L3 = await GetDispatchAvailableCar(
    L2,
    drop_x,
    drop_y,
    AddMinuteToDate(new Date(hos_dep_time), estimatedTime / 60000)
  ).then((res) => res);

  const ResultData = {
    dispatch: GetDispatchResult(L3),
    expect_pickup_time: pickupTime,
    expect_terminate_service_time: ToKoreanTime(
      AddMinuteToDate(new Date(hos_dep_time), estimatedTime / 60000)
    ),
    expect_move_distance: estimatedDist / 1000,
    expect_move_time: estimatedTime / 60000,
  };

  if (ResultData.dispatch == -1) {
    return -1;
  } else {
    console.log(ResultData);
    return ResultData; //최종 배차된 차의 car_id
  }
};

export default Case2;
