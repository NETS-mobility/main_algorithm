const express = require("express");
const router = express.Router();
/*const { Case1, Case2, Case3 } = require("../frontWork/case");
const {
  testData1,
  testData2,
  testData3,
  testData4,
} = require("../data/tmpData");*/
const Algo = require("../algorithm/algo");

// ===== 메인 알고리즘 실행 =====
router.post("/dispatch", async function (req, res, next) {

  Algo();
  res.status(200).send();
  /*let isOverPoint = 0;
  if (testData2.gowithHospitalTime > 120) {
    isOverPoint = 1; // 2시간 초과
  }

  if (testData2.dire == "집-집") {
    if (isOverPoint) {
      //집-집 (왕복) (동행 1시간 이상)
      let dispatch4_1 = await Case1(testData4);
      let dispatch4_2 = await Case2(testData4);
      if (dispatch4_1 != -1 && dispatch4_2 != -1) {
        return { goHospital: dispatch4_1, goHome: dispatch4_2 };
      }
    } else {
      //집-집 (왕복) (동행 1시간 이하)
      let dispatch3 = Case3(testData3);
      if (dispatch3 != -1) {
        return dispatch3;
      }
    }
  } else if (testData1.dire == "집-병원") {
    //집-병원
    let dispatch1 = Case1(testData1);
    if (dispatch1 != -1) {
      return dispatch1;
    }
  } else if (testData2.dire == "병원-집") {
    //병원-집
    let dispatch2 = Case2(testData2);
    if (dispatch2 != -1) {
      return dispatch2;
    }
  }
  return "no dispatch"; //배차 실패했으면 no dispatch 반환
  res.status(200).send(); //return값 전달해주셔야 합니다.*/
});

module.exports = router;
