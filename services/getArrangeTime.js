// === 서비스 정리 시간 구하는 모듈 ===
// service: 예약 서비스 종류 ID

/*const GetArrangeTime = (service) => {
  if (service == "basic") {
    return 10; //db에서 가져오기
  } else {
    return 20; //db에서 가져오기
  }
};*/

const pool2 = require("../module/mysql2");

const GetArrangeTime = async (service) => {
  let result;
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const sql =
      "select `service_free_time` as `freeTime` from `service_info` where `service_kind_id`=?;";
    const sql_result = await connection.query(sql, [service]);
    const sql_data = sql_result[0];
    result = sql_data[0].freeTime;
  } catch (err) {
    console.error("err : " + err);
  } finally {
    connection.release();
    return result;
  }
};

module.exports = GetArrangeTime;
