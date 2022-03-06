// === DB에 배차 정보를 저장하는 모듈 ===

/*
 * dire: 방향 (문자열, 집->병원 or 편도 - "1", 병원->집 - "2")
 * rev_id: 예약 아이디 (문자열, DB의 reservation 테이블에 먼저 tuple이 있어야 함)
 * car_id: 차량 아이디
 * manager_id: 네츠매니저 아이디
 * adr_start: 시작 주소
 * adr_end: 도착 주소
 * time_start: 시작 시간 (날짜 포함, ex. "2022-03-04 19:00")
 * time_end: 도착 시간 (날짜 포함)
*/

// 성공시 true 반환


const pool2 = require("./mysql2");

const InsertDispatch = async (dire, rev_id, car_id, manager_id, adr_start, adr_end, time_start, time_end) => {
  let success = true;
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const sql = "insert into `car_dispatch` values (?,?,?,?,?,?,?,?);"
    await connection.query(sql, [rev_id + dire, rev_id, car_id, manager_id, adr_start, adr_end, time_start, time_end]);
  } catch (err) {
    console.error("err : " + err);
    success = false;
  } finally {
    connection.release();
    return success;
  }
};

module.exports = InsertDispatch;
