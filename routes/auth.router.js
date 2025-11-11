import express, { response } from 'express';

const authRouter = express.Router();

authRouter.post('/api/login', (request, response, next) => {
  response.status(200).send('로그인 성공');
});

// 라우터 정의 .....

export default authRouter;