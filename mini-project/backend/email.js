import {getToday} from './utils.js'
import nodemailer from 'nodemailer'

export function checkEmail(email) {
  if(email === undefined || email.includes("@") === false) {
    console.log("에러 발생!!!! 이메일 주소를 제대로 입력해주세요!!!")
    return false
  } else {
    return true
  }
} 

export function getWelcomeTemplate({ name, age, school, email }) {
  const myTemplate = `
    <html>
      <body>
      <div style="display: flex; flex-direction: column; align-items: center;">
        <h1>${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이름 : ${name}</div>
        <div>나이 : ${age}</div>
        <div>학교 : ${school}</div>
        <div>이메일 : ${email}</div>
        <div>가입일 : ${getToday()}</div>
      </body>
    </html>
  `
  return myTemplate
}

export async function sendTemplateToEmail(email, myTemplate) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  })

  const res = await transporter.sendMail({
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다.",
    html: myTemplate
  })

  console.log(res);

  // console.log(email + "이메일로 가입환영템플릿" + myTemplate + "를 전송합니다.");
}