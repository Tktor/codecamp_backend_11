import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {options} from './swagger/config.js'
import cors from 'cors'
import 'dotenv/config'

import {checkPhone, getToken, sendTokenToSMS } from './phone.js'
import {checkEmail, getWelcomeTemplate, sendTemplateToEmail } from './email.js'

const app = express()

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));
app.get('/users', (req, res) => {
	const result = [
    {
      email : "aaa@gmail.com", 
      name : "철수",
      phone : "010-1234-5678",
      personal : "220110-2222222",
      prefer : "https://naver.com"
    },
    {
        email : "Nick@nick.com", 
      name : "Nick",
      phone : "010-1234-5678",
      personal : "220219-0000000",
      prefer : "https://naver.com"
    },
    {
        email : "Judy@judy.com", 
      name : "Judy",
      phone : "010-1234-5678",
      personal : "220219-0000000",
      prefer : "https://naver.com"
    },
    {
        email : "Anna@anna.com", 
      name : "Anna",
      phone : "010-1234-5678",
      personal : "220219-0000000",
      prefer : "https://naver.com"
    },
    {	email : "Elsa@elsa.com", 
      name : "Elsa",
      phone : "010-1234-5678",
      personal : "220219-0000000",
      prefer : "https://naver.com"
    }
  ]

  res.send(result);
});

app.get('/starbucks', (req, res) => {
	const result = [
    { name: '아메리카노', kcal: 5 },
    { name: '카페라떼', kcal: 10 },
    { name: '콜드브루', kcal: 15 },
    { name: '카페모카', kcal: 50 },
    { name: '돌체라떼', kcal: 500 },
    { name: '카라멜라떼', kcal: 200 },
    { name: '바닐라라떼', kcal: 20 },
    { name: '에스프레소', kcal: 1 },
    { name: '디카페인', kcal: 5 },
    { name: '오트라떼', kcal: 300 }
  
  ]

  res.send(result);
});

app.post('/boards', (req, res) => {
  // 1. 브라우저에서 보내준 데이터 확인하기
	console.log(req)
  console.log("=========================")
  console.log(req.body) // 추가
	
	// 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

  // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
  res.send("게시물 등록에 성공하였습니다.")
});

app.post("/tokens/phone", function (req, res) {
  const myphone = req.body.phoneNumber

    // 1. 휴대폰 번호 자리수 맞는지 확인(10~11자리)
    const isValid = checkPhone(myphone)
    if(isValid === false) return // if문은 1줄일때 중괄호 생략 가능(2줄 이상은 생략 불가)
  
    // 2. 핸드폰 토큰 6자리 만들기
    const mytoken = getToken()
  
    // 3. 핸드폰 번호에 토큰 전송하기
    sendTokenToSMS(myphone, mytoken)
  

  res.send("인증완료!!!")
})

app.post("/usersSignup", function(req, res) {
  const { name,
    personal,
    phoneNumber2,
    prefer,
    email,
    password} = req.body
  // const name = req.body.name
  // const age = req.body.age
  // const school = req.body.school
  // const email = req.body.email

  // 1. 이메일이 정상인지 검증하기(1-존재여부, 2-"@"" 포함여부)
  const isValid = checkEmail(email)
  if(isValid === false) return
  
  // 2. 가입환영 템플릿 만들기
  const welcomeTemplate = getWelcomeTemplate({ name, phoneNumber2, prefer })

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, welcomeTemplate)

  res.send("가입완료!!!")

})

app.listen(3000, () => {
  console.log();
});