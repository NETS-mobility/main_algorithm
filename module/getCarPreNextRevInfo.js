// === 특정 차량이 맡은 가장 최근 예약의 병원-집 도착 장소를 구하는 모듈 ===

// DB의 car_schedule 뷰 사용
/*
 * 이전 예약시간: prev_terminate_time
 * 다음 예약시간: post_pickup_time
 * 이전 예약장소 x: prev_last_x
 * 이전 예약장소 y: prev_last_y
 * 다음 예약장소 x: post_first_x
 * 다음 예약장소 y: post_first_y
 */

const pool2 = require("./mysql2");

const Func = async (id) => {
  let result;
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const now = new Date();
    const sql = "select * from `car_schedule` where `car_id`=? and `date`=?;";
    const sql_result = await connection.query(sql, [id, now]);
    result = sql_result[0];
  } catch (err) {
    console.error("err : " + err);
  } finally {
    connection.release();
    return result;
  }
};
module.exports = Func;
