const { Case1, Case2, Case3 } = require("./case");
const ToKoreanTime = require("./util/toKoreanTime");
const insertDispatch = require("./algorithm/insertDispatch");

const Algo = async (revData) => {
  let success = false;
  let isOverPoint = 0;

  await new Promise((resolve) => setTimeout(resolve, 500));
  if (revData.gowithHospitalTime >= 120) {
    isOverPoint = 1; // 2시간 이상
  } else {
    isOverPoint = 0;
  }

  if (revData.dire == "집-집") {
    if (isOverPoint) {
      //case4의 경우, 인자를 넘겨줄 때 gowithHospitalTime을 0으로 줘야 한다.
      let dispatchResult4_1 = await Case1(revData, false);
      let dispatchResult4_2 = await Case2(revData, false);
      console.log(dispatchResult4_1);
      console.log(dispatchResult4_2);
      if (dispatchResult4_1 != -1 && dispatchResult4_2 != -1) {
        success = await insertDispatch([dispatchResult4_1, dispatchResult4_2], revData, [1, 2], false);
      }
    } else {
      let dispatchResult3 = await Case3(revData);
      console.log(dispatchResult3);
      if (dispatchResult3 != -1) {
        success = await insertDispatch([dispatchResult3, dispatchResult3], revData, [1, 2], true);
      }
    }
  } else if (revData.dire == "집-병원") {
    let dispatchResult1 = await Case1(revData, true);
    console.log(dispatchResult1);
    if (dispatchResult1 != -1) {
      success = await insertDispatch([dispatchResult1], revData, [1], false);
    }
  } else if (revData.dire == "병원-집") {
    let dispatchResult2 = await Case2(revData, true);
    console.log(dispatchResult2);
    if (dispatchResult2 != -1) {
      success = await insertDispatch([dispatchResult2], revData, [2], false);
    }
  }
  console.log("Done!");
  return success;
};

module.exports = Algo;
