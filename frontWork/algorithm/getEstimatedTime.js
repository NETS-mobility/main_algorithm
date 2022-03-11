import TmapTimeMachine from "./tmapTimeMachine";
import GetArrangeTime from "./getArrangeTime";

const GetEstimatedTime = async (
  departure,
  arrival,
  way,
  hosTime,
  service_kind_id
) => {
  let moveType = "";
  let estimatedTime = 0;
  let estimatedDistance = 0;

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
      estimatedTime =
        tmapTime.estimatedTime + 20 + GetArrangeTime(service_kind_id); //a1
      estimatedDistance = tmapTime.estimatedDistance;
    });
    estimatedTime = estimatedTime * 60000; //minutes -> milliseconds
    return { time: estimatedTime, dist: estimatedDistance };
  } catch (err) {
    return err;
  }
};

export default GetEstimatedTime;
