//이용 가능한 차량 목록
const Data = require("./car.json");
const GetAvailableCar = (id) => {
  const available = Data.car[id].available; //available이 true인지 판단.
  return available;
};
module.exports = GetAvailableCar;
