// === 서비스 정리 시간 구하는 모듈 ===
// service: 예약 서비스 종류 ID

//service_kind_id: 예약 서비스 종류 ID
//네츠 휠체어 편도 = 2
//네츠 휠체어 왕복 = 3
//네츠 휠체어 플러스 편도 = 4
//네츠 휠체어 플러스 왕복 = 5

// const GetArrangeTime = (service_kind_id) => {
//   switch (
//     service_kind_id //클라이언트에서 가져오기
//   ) {
//     case 2:
//     case 3:
//       return 10; //db에서 가져오기
//     case 4:
//     case 5:
//       return 20; //db에서 가져오기
//   }
// };

// export default GetArrangeTime;

const pool2 = require("./mysql2");

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
