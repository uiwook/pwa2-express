import express from 'express';
import db from '../app/models/index.js'
import { Op } from 'sequelize';
import dayjs from 'dayjs';
const { sequelize, Employee, TitleEmp, Title } = db;

const eduRouter = express.Router();

eduRouter.get('/api/edu', async (request, response, next) => {
  try {
    const fireDate = request.query.date;

    let result = null;

    // -----------------------------
    // 평문으로 실행하고 싶을 경우
    // const sql = `SELECT * FROM employees WHERE fire_at >= ?`; // 내부에 세미콜론 넣으면 안됨
    // result = await sequelize.query(
    //   sql,
    //   {
    //     replacements: [fireDate],
    //     type:sequelize.QueryTypes.SELECT
    //   }
    // );
    
    // // -----------------------------
    // // Model 메소드
    // // -----------------------------
    // // 전체 조회 (조건 설정 가능)
    // // SELECT * FROM employees
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'birth'], // 조회할 컬럼 지정(SELECT 절)
    //   where: {
    //     empId: {
    //       [Op.lte]: 100
    //     }
    //   }
    // });

    // // findeOne() : 조건에 맞는 첫번째 레코드 조회
    // result = await Employee.findOne({
    //   attributes: ['empId', 'name', 'birth'],
    //   where: {
    //     empId: {
          // [Op.between]: [2, 10]
    //     }
    //   }
    // });

    // // findByPK(id) : PK 기준 단일 레코드 조회
    // result = await Employee.findByPk(50000, {
    //   attributes: ['empId', 'name']
    // });

    // count(options), sum(field, options), max(field, options), min(field, options), avg(field, options)
    // SELECT COUNT(*) FROM employees WHERE deleted_at IS NULL
    // result = await Employee.count({
    //   paranoid: false
    // });
    // result = await Employee.max('empId');

    // // create(values, options) : 새 레코드 생성
    // result = await Employee.create({
    //   name: '테스트',
    //   birth: '2000-01-01',
    //   hireAt: dayjs().format('YYYY-MM-DD'),
    //   gender: 'F'
    // });

    // // update(values, options) : 기존 레코드 수정 (영향받은 레코드 수 반환)
    // // UPDATE employees SET name = "사자" WHERE emp_id = 100006;
    // result = await Employee.update(
    //   {
    //     name: '사자'
    //   }
    //   ,{
    //     where: {
    //       empId: 100006
    //     }
    //   }
    // );

    // // save() : 모델 인스턴스를 기반으로 레코드 생성 및 수정
    // const employee = await Employee.findByPk(100006);
    // employee.name = '둘리';
    // employee.birth = '1997-01-01';
    // result = await employee.save();

    // save()를 이욯애 새로운 객체 생성
    // const employee = await Employee.build(); // 빈 모델 객체 인스턴스
    // employee.name = '또치';
    // employee.birth = '1980-01-01';
    // employee.gender = 'F';
    // employee.hireAt = dayjs().format('YYYY-MM-DD');
    // result = await employee.save();

    // // ---------------------
    // // destroy(options) : 조건에 맞는 레코드 삭제
    // result = await Employee.destroy({
      //   where: {
        //     empId: 100008
        //   },
        //   force: true // 모델에서 paranoid: true일 경우에도, 물리적 삭제를 위한 옵션
        // });
        
    // // ---------------------
    // // restore(options) : Soft Delete 된 레코드를 복원
    // result = await Employee.restore({
    //   where: {
    //     empId: 100008
    //   }
    // });

    // // 이름이 '강가람'이고, 성별이 여자인 사원 정보 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     name: '강가람',
    //     gender: 'F',
    //   }
    // });
    
    // // 이름이 '강가람' 또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //     [Op.or]: [
    //       {name: '강가람'},
    //       {name: '신서연'}
    //     ]
    //   }
    // });

    // // 성별이 여자이고, 이름이 '강가람' 또는 '신서연'인 사원 조회
    // result = await Employee.findAll({
    //   attributes: ['empId', 'name', 'gender'],
    //   where: {
    //       gender: 'F',
    //       [Op.or]: [
    //         {name: '강가람'},
    //         {name: '신서연'}
    //       ]
    //   }
    // });

    // // between
    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.between]: [1, 100]
    //     }
    //   }
    // });

    // // isnull, isnotnull
    // result = await Employee.findAll({
    //   where: {
    //     fireAt: {
    //       //null 조건
    //       [Op.is]: null
    //       // [Op.not]: null
    //     }
    //   }
    // });

    // // in
    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.in]: [1, 2, 3]
    //     }
    //   }
    // });

    // // like
    // result = await Employee.findAll({
    //   where: {
    //     name: {
    //       [Op.like]: '%가람'
    //       // [Op.iLike]: '%가람' // 대소문자 무시
    //     }
    //   }
    // });

    // // orderby, limit, offset
    // result = await Employee.findAll({
    //   where: {
    //     empId: {
    //       [Op.gte]: 10000
    //     }
    //   },
    //   order: [
    //     ['name', 'ASC'],
    //     ['birth', 'DESC']
    //   ],
    //   limit: 10,
    //   offset: 10
    // });

    // // groupby, having
    // result = await Employee.findAll({
    //   attributes: ['gender', [sequelize.fn('COUNT', sequelize.col('*')), 'cnt_gender']],
    //   group: ['gender'],
    //   having: sequelize.literal('cnt_gender >= 40000'),
    // });

    // join
    // result = await Title.findOne({
    //   attributes: ['title'], // 각 테이블의 컬럼 조회
    //   include: [
    //     {
    //       model: TitleEmp, // 내가 연결할 모델
    //       as: 'titleEmps', // 내가 사용할 관계
    //       required: true, // `true`면 Inner join, `false`면 Left Outer Join
    //       attributes: ['titleCode', 'empId'], // 각 테이블의 컬럼 조회
    //       where: {
    //         empId: 1,
    //         endAt: {
    //           [Op.is]: null,
    //         }
    //       }
    //     }
    //   ]
    // });

    result = await Employee.findOne({
      attributes: ['empId', 'name'], // 각 테이블의 컬럼 조회
      where: {
        empId: 1
      },
      include: [
        {
          model: TitleEmp, // 내가 연결할 모델
          as: 'titleEmps', // 내가 사용할 관계
          required: true, // `true`면 Inner join, `false`면 Left Outer Join
          attributes: ['titleCode'], // 각 테이블의 컬럼 조회
          separate: true, // Lazy Loading : n -> 1일때만 사용가능
          where: {
            endAt: {
              [Op.is]: null,
            }
          },
          include: [
            {
              // model: Title,
              // as: 'title',
              association: 'title',
              required: true,
              attributes: ['title'],
            }
          ]
        }
      ]
    });

    return response.status(200).send({
      msg: '정상 처리',
      data: result
    });
  } catch (error) {
    next(error);
  }
});

export default eduRouter;