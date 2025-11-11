import { body } from "express-validator";

// body - json data
// param - segment pharameter
// query - query pharameter

// 아이디 필드
export const account = body('account')
  .trim() // 좌우공백 제거
  .notEmpty() // 비어있지 않으면 통과
  .withMessage('아이디는 필수 항목입니다.')  // 위 조건의 에러메세지출력
  .bail() // 위에꺼 통과못하면 진행 안하겠다
  .matches(/^[a-zA-Z0-9]{4,8}$/) // `/^(시작)[허용문자]{글자수 허용범위}$/(끝)` 반드시 다 붙여서 써야함
  .withMessage('영어 대/소문자, 숫자로 4~8글자 허용') // 만족못하면 메세지출력
  ;
  
// 비밀번호 필드
export const password = body('password')
  .trim()
  .notEmpty()
  .withMessage('비밀번호는 필수 항목입니다.')
  .bail()
  .matches(/^[a-zA-Z0-9!@]{4,8}$/)
  .withMessage('영어 대/소문자, 숫자, 특수문자(!@)로 4~8글자 허용')
;

// 이름 필드
export const name = body('name')
  .trim() // 좌우공백 제거
  .notEmpty() // 비어있지 않으면 통과
  .withMessage('이름은 필수 항목입니다.')  // 위 조건의 에러메세지출력
  .bail() // 위에꺼 통과못하면 진행 안하겠다
  .matches(/^[가-힣]{2,30}$/) // `/^(시작)[허용문자]{글자수 허용범위}$/(끝)` 반드시 다 붙여서 써야함
  .withMessage('한글 2~30글자 허용') // 만족못하면 메세지출력
;