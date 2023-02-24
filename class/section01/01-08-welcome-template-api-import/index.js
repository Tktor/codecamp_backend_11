import {checkEmail, getWelcomeTemplate, sendTemplateToEmail} from './email.js'

function createUser({ name, age, school, email }) {
  // 1. 이메일이 정상인지 검증하기(1-존재여부, 2-"@"" 포함여부)
  const isValid = checkEmail(email)
  if(isValid === false) return
  // 2. 가입환영 템플릿 만들기
  const welcomeTemplate = getWelcomeTemplate({ name, age, school, email })

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, welcomeTemplate)
}

const name = "철수"
const age = 8
const school = "다람쥐 초등학교"
const email = "a@a.com"
// const createdAt = "2023-01-10" // newDate 활용하여 날짜 변동 생성 !!!!

createUser({ name, age, school, email })