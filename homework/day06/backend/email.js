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

export function getWelcomeTemplate({ name, phoneNumber2, prefer }) {
  const myTemplate = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이름 : ${name}</div>
        <div>전화번호 : ${phoneNumber2}</div>
        <div>좋아하는 사이트 : ${prefer}</div>
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
      user: process.env.MY_EMAIL,
      pass: process.env.MY_EMAIL_SECRET,
    }
  })

  const res = await transporter.sendMail({
    from: process.env.MY_EMAIL,
    to: email,
    subject: "[코드캠프] 가입을 축하합니다.",
    html: myTemplate
  })

  console.log(res);

  // console.log(email + "이메일로 가입환영템플릿" + myTemplate + "를 전송합니다.");
}