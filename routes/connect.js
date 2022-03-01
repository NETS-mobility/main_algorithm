const express = require('express');
const router = express.Router();

// ===== 예약 정보 받아오기 =====
router.post('/getRev', async function (req, res, next) {
    const { dire, pickup_x, pickup_y, drop_x, drop_y, hos_x, hos_y, pickup_time, hos_arr_time, hos_dep_time, rev_date } = req.body;

    // 변수 저장 코드 //
    console.log(req.body);
    
    
    ///////////////////

    res.status(200).send();
});

module.exports = router;
