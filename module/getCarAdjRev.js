// === 특정 차량이 맡은 인접 예약의 병원-집 도착 장소를 구하는 모듈 ===
// 인접 기준 - 서비스 시작 시간

// id: 차량 아이디
// rd: 예약 날짜 (문자열, ex. "2022-03-04")
// rt: 서비스 시작 시간 (문자열, ex. "13:00")

/*
 * 이전 예약정보: prev (없을 경우 undefiend)
 *    종료시간: time
 *    예약장소 x: x
 *    예약장소 y: y
 * 다음 예약정보: next (없을 경우 undefiend)
 *    종료시간: time
 *    예약장소 x: x
 *    예약장소 y: y
 */

const pool2 = require("./mysql2");

const getCarAdjRev = async (id, rd, rtime) => {
  let result;
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    const sql1 = "select * from `car_reservation` where `car_id`=? and `date`=? and `terminate_time`<? order by `terminate_time` DESC;";
    const sqlr1 = await connection.query(sql1, [id, rd, rtime]);
    const sqld1 = sqlr1[0];
    const sql2 = "select * from `car_reservation` where `car_id`=? and `date`=? and `pickup_time`>? order by `pickup_time`;";
    const sqlr2 = await connection.query(sql2, [id, rd, rtime]);
    const sqld2 = sqlr2[0];

    let prev, next;
    if(sqld1.length > 0)
    {
      prev = {
        time: sqld1[0].terminate_time,
        x: sqld1[0].arrival_x,
        y: sqld1[0].arrival_y
      }
    }
    if(sqld2.length > 0)
    {
      next = {
        time: sqld2[0].pickup_time,
        x: sqld2[0].start_x,
        y: sqld2[0].start_y
      }
    }

    result = {
        prev: prev,
        next: next
    };
  } catch (err) {
    console.error("err : " + err);
  } finally {
    connection.release();
    return result;
  }
};
module.exports = getCarAdjRev;
