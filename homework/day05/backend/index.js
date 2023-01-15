import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import {options} from './swagger/config.js'
import cors from 'cors'


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


app.listen(3000, () => {
  console.log();
});