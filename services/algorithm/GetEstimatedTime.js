const TmapTimeMachine = require("./tmapTimeMachine");
const GetArrangeTime = require("./GetArrangeTime");

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
      estimatedTime = tmapTime + 20 + GetArrangeTime(service_kind_id); //a1
    });
    estimatedTime = estimatedTime * 60000; //minutes -> milliseconds
    return estimatedTime;
  } catch (err) {
    return err;
  }
};

module.exports = GetEstimatedTime;
