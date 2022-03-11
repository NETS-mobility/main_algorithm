//service_kind_id: 예약 서비스 종류 ID
//네츠 휠체어 편도 = 2
//네츠 휠체어 왕복 = 3
//네츠 휠체어 플러스 편도 = 4
//네츠 휠체어 플러스 왕복 = 5

const GetArrangeTime = (service_kind_id) => {
  switch (
    service_kind_id //db에서 가져오기
  ) {
    case 2:
    case 3:
      return 10;
    case 4:
    case 5:
      return 20;
  }
};

export default GetArrangeTime;
