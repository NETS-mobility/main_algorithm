// === DB에 배차 정보를 저장하는 모듈 ===

// dispatchResult: 배차 목록 (배열)
// revData: 예약 데이터 (= 클라이언트 입력)
// direction: 방향 목록 (배열, 인덱스는 dispatchResult와 동일)
// is3: case 3 여부

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


const pool2 = require("../util/mysql2");

const InsertDispatch = async (dispatchResult, revData, direction, is3) => {
  let success = true;
  console.log({dispatchResult, revData, direction, is3});
  const connection = await pool2.getConnection(async (conn) => conn);
  try {
    await connection.beginTransaction(); // 트랜잭션 시작

    for(let i = 0; i < dispatchResult.length; i++)
    {
      const dire = direction[i];
      const rev_id = "200215000000"; // revData.rev_id;
      const car_id = dispatchResult[i].dispatch[0].car_id;
      const manager_id = "5"; // 기본적으로 차량의 운전자로 배정
      const adr_start = (dire == 1) ? revData.pickup : revData.hos;
      const adr_end = (dire == 1) ? revData.hos : revData.drop;
      let time_start = dispatchResult[i].expect_pickup_time;
      let time_end = dispatchResult[i].expect_terminate_service_time;
      if(is3)
      {
        if(dire == 1) time_end = revData.old_hos_arr_time; // case 3일 경우, 병원 도착 시간을 기준으로 2개로 분할
        if(dire == 2) time_start = revData.old_hos_arr_time;
      }

      for(let w = 0; w < 2; w++) // address_coordinate 테이블에 주소 tuple 추가
      {
        const adr = (w == 0) ? adr_start : adr_end;
        const sql1 = "select * from `address_coordinate` where `address`=?;"
        const sqlr1 = await connection.query(sql1, [adr]);
        if(sqlr1[0].length == 0)
        {
          let x = 0;
          let y = 0;
          switch(adr)
          {
            case revData.pickup: x = revData.pickup_x; y = revData.pickup_y; break;
            case revData.hos: x = revData.hos_x; y = revData.hos_y; break;
            case revData.drop: x = revData.drop_x; y = revData.drop_y; break;
          }
          const sql2 = "insert into `address_coordinate` values (?,?,?);"
          await connection.query(sql2, [adr, x, y]);
        }
      }

      console.log([rev_id + dire, rev_id, car_id, manager_id, adr_start, adr_end, time_start, time_end]);

      const sql = "insert into `car_dispatch` values (?,?,?,?,?,?,?,?);"
      await connection.query(sql, [rev_id + dire, rev_id, car_id, manager_id, adr_start, adr_end, time_start, time_end]);
    }

    await conn.commit() // 완료시 커밋
  }
  catch (err) {
    await connection.rollback() // 실패시 롤백
    console.error("err : " + err);
    success = false;
  }
  finally {
    connection.release();
    return success;
  }
};

module.exports = InsertDispatch;
