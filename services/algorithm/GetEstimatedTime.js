const TmapTimeMachine = require("./tmapTimeMachine");
const GetArrangeTime = require("./GetArrangeTime");
/*
======== GetEstimatedTime =======
예상 소요 시간을 계산함.

return  {
  estimatedTime: 예상 소요 시간(milliseconds)
}
*/

const GetEstimatedTime = async (
  departure,
  arrival,
  way,
  hosTime,
  service_kind_id
) => {
  let moveType = "";
  let estimatedTime = 0;

  if (way == "집-병원") {
    moveType = "departure";
  } else {
    moveType = "arrival";
  }

  try {
    await TmapTimeMachine(
      departure?.lon,
      departure?.lat,
      arrival?.lon,
      arrival?.lat,
      moveType,
      hosTime
    ).then((tmapTime) => {
      estimatedTime = tmapTime + 20 + GetArrangeTime(service_kind_id); //예상 소요 시간 = tmap을 통해 나온 예상 소요 시간 + 정리 시간 + 20분(알파)
    });
    estimatedTime = estimatedTime * 60000; //minute -> milliseconds
    return estimatedTime;
  } catch (err) {
    return err;
  }
};

module.exports = GetEstimatedTime;
