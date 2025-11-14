import dayjs from "dayjs";
import { DataTypes } from "sequelize";

// 모델명
const modelname = 'TitleEmp';

// 컬럼 정의
const attributes = {
  titleEmpId: {
    field: 'title_emp_id', // DB의 컬럼 물리명
    type: DataTypes.BIGINT.UNSIGNED, // 컬럼 데이터 타입
    primaryKey: true, // PK 지정
    allowNull: false, // NULL 비허용
    autoIncrement: true, // AUTO_INCREMENT 지정
    comment: '사원 직급 ID'
  },
  empId: {
    field: 'emp_id',
    type: DataTypes.BIGINT.UNSIGNED,
    allowNull: false,
    comment: '사원 ID'
  },
  titleCode: {
    field: 'title_code',
    type: DataTypes.CHAR(4),
    allowNull: false,
    comment: '직급코드',
  },
  startAt: {
    field: 'start_at',
    type: DataTypes.DATEONLY,
    allowNull: false,
    comment: '시작일',
    get() {
      const val = this.getDataValue('startAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
  endAt: {
    field: 'end_at',
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
    comment: '종료일',
    get() {
      const val = this.getDataValue('endAt');
      if(!val) {
        return null;
      }
      return dayjs(val).format('YYYY-MM-DD');
    }
  },
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: '작성일',
      get() {
        const val = this.getDataValue('createdAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD');
      }
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
      comment: '수정일',
      get() {
        const val = this.getDataValue('updatedAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD');
      }
    },
    deletedAt: {
      field: 'deleted_at',
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: '삭제일',
      get() {
        const val = this.getDataValue('deletedAt');
        if(!val) {
          return null;
        }
        return dayjs(val).format('YYYY-MM-DD');
      }
    },
};

// Options 설정
const options = {
  tableName: 'title_emps',
  timestamps: true, // created, updated 자동설정
  paranoid: true // soft delete설정
};

// 모델 객체 생성
const TitleEmp = {
  init: (sequelize) => {
    const defineTitleEmp = sequelize.define(modelname, attributes, options);

    return defineTitleEmp;
  },
  associate: (db) => {
    // 1:n 관계에서 부모 모델에 설정하는 방법 (1명의 사원은 복수의 직급 정보를 가진다.)
    db.TitleEmp.belongsTo(db.Employee, { targetKey: 'empId', foreignKey: 'empId', as: 'employee' });
    db.TitleEmp.belongsTo(db.Title, { targetKey: 'titleCode', foreignKey: 'titleCode', as: 'title' });
  }
};

export default TitleEmp;