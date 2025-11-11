import express from 'express'; // express 모듈 가져오기
import authRouter from './routes/auth.router.js';
import usersRouter from './routes/users.router.js';
import { eduTest } from './app/middlewares/edu/edu.middleware.js';

const app = express(); // express 객체 등록
app.use(express.json()); // JSON으로 요청이 올 경우 파싱 처리
app.use(eduTest); // 커스텀 미들웨어 전역 등록


// 유저가 보낸 요청이 https가 개시이고, 경로가 '/'이면 뒤의 처리를 진행한다.
// 클라이언트가 '/' 경로로 GET 요청을 보낼 때 실행되는 Router
app.get('/', (request, response, next) => {
  response.status(200).send({
    code: '00'
    ,msg: '안녕 익스프레스'});
// request : 유저가 요청을 보낸 파라미터 등의 받은정보
// response : 우리가 유저한테 줄 정보를 셋팅 200, 300, 400에러코드 등
// next : request, response가 오기 전 후 미들웨어(다음처리)이동할 때 사용
// 우리가 적는 method 중 .send가 가장 마지막에 적힌다.(유저에게 바로 보냄)
});

// 클라이언트가 '/' 경로로 POST 요청을 보낼 때 실행되는 Router
app.post('/', (request, response, next) => {
  response.status(200).send('포스트 익스프레스!');
});

// 클라이언트가 '/' 경로로 PUT 요청을 보낼 때 실행되는 Router
app.put('/', (request, response, next) => {
  response.status(200).send('풋 익스프레스!');
});

// 클라이언트가 '/' 경로로 DELETE 요청을 보낼 때 실행되는 Router
app.delete('/', (request, response, next) => {
  response.status(200).send('딜리트 익스프레스!');
});

// ------------
// Query Parameter 제어
// Request.query 프로퍼티를 통해서 접근 가능
// 모든 값을 string으로 받기때문에 주의 필요
app.get('/api/posts',(request, response, next) => {
  const params = request.query;
  const name = request.query.name;
  const age = parseInt(request.query.age);

  response.status(200).send(params);
});

// Segment Parameter
// `Request.params` 를 통해서 접근 가능
app.get('/api/posts/:id', (request, response, next) => {
  const postId = request.params.id;
  response.status(200).send(postId);
});

// JSON 요청 제어
app.post('/api/posts/', (request, response, next) => {
  const {account, password, name} = request.body;
  response.status(200).send({account, password, name});
  // const account = request.body.account;
  // const password = request.body.password;
  // const name = request.body.name;
  // response.status(200).send({account: account, password: password, name: name});
});

// -------------
// 라우트 그룹
// -------------
// 라우트를 모듈로 나누고 그룹핑하여 관리
app.use('/', authRouter);
app.use('/api/users', usersRouter);

// ------------
// 대체 라우트(라우트 지정 후 가장 마지막에 작성)
app.use((request, response, next) => {
  response.status(404).send({
    code: 'E01'
    ,msg:'찾을 수 없는 페이지입니다.'
  });
});

// 서버를 주어진 포트에서 시작
app.listen(3000, () => {
  console.log('3000포트에서 리스닝');
});
// 보통의 익스프레스는 포트번호가 3000번, 서버가 켜졌을 때 처리가 필요하면 콜백함수로 작성