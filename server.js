const express = require('express');

// 라우팅 js파일 목록
const routes = require('./routes/connect');

// npm 모듈 목록
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 5000; // 포트 설정
app.listen(port, () => console.log(`${port}`));

// 서버별 도메인 설정
app.use('', routes);
