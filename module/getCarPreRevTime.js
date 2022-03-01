// === 특정 차량이 맡은 가장 최근 예약의 병원-집 도착 시간, 장소를 구하는 모듈 ===
// 현재 시간 기준 - 함수를 호출한 시간

const pool2 = require("mysql2");

const Func = (id) => {
  const connection = await pool2.getConnection(async (conn) => conn);
    try {
      const now = 
    const sql = "select `car_id` from `reservation` where `car_id`=?;";
    const sql_result = await connection.query(sql, [b1, a1]);
    const sql_data = sql_result[0];
    return sql_data;
  } catch (err) {
    console.error("err : " + err);
    return undefined; // 오류 발생 -> undefined 리턴
  } finally {
    connection.release();
  }
};
module.exports = Func;
