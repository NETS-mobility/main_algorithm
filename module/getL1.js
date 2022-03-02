// === L1 구하는 함수 모듈 ===

// a1 = (자택 -> 병원) 예상 소요시간 = tmap(자택 -> 병원) + 20 + X
// b1 = 픽업 장소에 도착해야 되는 시간(must) = 희망 병원 도착 시간 - 예상 소요 시간
// L1 = 여유시작시간 < b1 && 여유시간 > a1 // (DB의 free_car_time 테이블 사용)


// !! free_car_time 삭제됨, 현재 수정 중 - 여유 시간을 보여주는 뷰를 생성해서 L1을 구하거나, 슈도 코드를 확인해야 함 (여유시작시간, 여유시간이 구체적으로 어떤 것인지?) !!

const pool2 = require("./mysql2");

const GetL1 = async (a1, b1) => {
  let result;
  /*const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const sql =
      "select `car_id` from `free_car_time` where `car_able_start_time` < ? and `car_able_time` > ?;";
    const sql_result = await connection.query(sql, [b1, a1]);
    result = sql_result[0];
  } catch (err) {
    console.error("err : " + err);
  } finally {
    connection.release();
    return result;
  }*/
  return [];
};

module.exports = GetL1;
