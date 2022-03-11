import { Case1, Case2, Case3 } from "./case";
import {
  testDataArr1,
  testDataArr2,
  testDataArr3,
  testDataArr4,
  testDataArr5,
} from "./tempData";
import { testData1, testData2, testData3, testData4 } from "./tempData/tmpData";
import ToKoreanTime from "./util/toKoreanTime";

const Algo = async () => {
  let isOverPoint = 0;
  const testData = testDataArr3;
  for (let i = 4; i < 5; i++) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (testData[i].gowithHospitalTime > 120) {
      isOverPoint = 1; // 2시간 초과
    } else {
      isOverPoint = 0;
    }

    if (testData[i].dire == "집-집") {
      if (isOverPoint) {
        //case4의 경우, 인자를 넘겨줄 때 gowithHospitalTime을 0으로 줘야 한다.
        let dispatchResult4_1 = await Case1(testData[i], false);
        let dispatchResult4_2 = await Case2(testData[i], false);
        console.log(
          `집-집 2시간 이상, ${i}-1번째: ${JSON.stringify(dispatchResult4_1)}`
        );
        console.log(
          `집-집 2시간 이상, ${i}-2번째: ${JSON.stringify(dispatchResult4_2)}`
        );
        // if (dispatchResult4_1 != -1 && dispatchResult4_2 != -1) {
        //   return { goHospital: dispatchResult4_1, goHome: dispatchResult4_2 };
        // }
      } else {
        let dispatchResult3 = await Case3(testData[i]);
        console.log(
          `집-집 2시간 이하, ${i}번째: ${JSON.stringify(dispatchResult3)}`
        );
        // if (dispatchResult3 != -1) {
        //   return dispatchResult3;
        // }
      }
    } else if (testData[i].dire == "집-병원") {
      let dispatchResult1 = await Case1(testData[i], true);
      console.log(`집-병원, ${i}번째: ${JSON.stringify(dispatchResult1)}`);
      // if (dispatchResult1 != -1) {
      //   return dispatchResult1;
      // }
    } else if (testData[i].dire == "병원-집") {
      let dispatchResult2 = await Case2(testData[i], true);
      console.log(`병원-집, ${i}번째: ${JSON.stringify(dispatchResult2)}`);
      // if (dispatchResult2 != -1) {
      //   return dispatchResult2;
      // }
    }
  }
  return "no dispatch";
};
export default Algo;
