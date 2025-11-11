// import express from 'express';

// const usersRouter = express.Router();

// // 회원정보 조회
// usersRouter.get('/api/users', (request, response, next) => {
//   response.status(200).send('유저 정보 조회 완료')
// });

// // 회원정보 수정
// usersRouter.put('/api/users', (request, response, next) => {
//   response.status(200).send('유저 정보 수정 완료')
// });
// // 회원정보 수정(단일)
// usersRouter.patch('/api/users', (request, response, next) => {
//   response.status(200).send('유저 정보 수정 완료')
// });

// // 대체 라우트
// usersRouter.use((request, response, next) => {
//   response.status(404).send('아직 아무것도 없어요.');
// });

// export default usersRouter;

import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';

const userRouter = express.Router();

// 회원정보 조회
userRouter.get('/:id', eduUsersTest, (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료')
});

// 회원정보 수정
userRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료')
});

export default userRouter;