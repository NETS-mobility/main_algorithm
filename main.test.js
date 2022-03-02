const mainFunc = require("./main.js");
const dire = "집-병원";
const pickup_x = "";
const pickup_y = "";
const drop_x = "";
const drop_y = "";
const hos_x = "";
const hos_y = "";
const pickup_time = "";
const hos_arr_time = "";
const hos_dep_time = "";
const rev_date = "";
const gowithHospitalTime = "";
test("this is test for main", () => {
  expect(
    mainFunc(
      dire,
      pickup_x,
      pickup_y,
      drop_x,
      drop_y,
      hos_x,
      hos_y,
      pickup_time,
      hos_arr_time, //희망
      hos_dep_time, //희망
      rev_date,
      gowithHospitalTime
    )
  ).toBe(0);
});
