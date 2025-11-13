import express from 'express';
import { eduUsersTest } from '../app/middlewares/edu/edu.middleware.js';
// import pool from '../db/my-db.js';

const userRouter = express.Router();

// 회원정보 전체조회
userRouter.get('/', eduUsersTest, (request, response, next) => {
  response.status(200).send('유저 정보 조회 완료')
});

// 회원정보 수정
userRouter.put('/:id', (request, response, next) => {
  response.status(200).send('유저 정보 수정 완료')
});

userRouter.get("/:id", async (request, response, next) => {
  try {
    const id = parseInt(request.params.id);
    // // ------------------
    // // Sequelize로 DB연동
    // // ------------------
    const result = await Employee.findByPk(id);
    return response.status(200).send(result);
    
    
    
    // // ------------------
    // // mysql2로 DB연동
    // // ------------------
    // // 쿼리 작성
    // const sql = `
    //   SELECT *
    //   FROM employees
    //   WHERE 
    //     emp_id = ?
    //     `;
    //     // AND emp_id = ?
    // // emp_id = ${id}로 하게되면 유저가 '' OR 1=1 과 같은식으로 쿼리를 공격해서 모든 데이터를 가져갈 수 있다.
    // // const [result] = await pool.query(sql);
    // // 아래 Prepared Statement로 안전하게 이용
    // const [result] = await pool.execute(sql, [id])

    // return response.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export default userRouter;