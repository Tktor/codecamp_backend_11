
import {checkEmail, getWelcomeTemplate, sendTemplateToEmail } from '../controller/service/email.js'

export class userCheck {
  userEmailCheck = (req, res) => {
    const { name, age, school, email } = req.body
    // const name = req.body.name
    // const age = req.body.age
    // const school = req.body.school
    // const email = req.body.email
  
    // 1. 이메일이 정상인지 검증하기(1-존재여부, 2-"@"" 포함여부)
    const isValid = checkEmail(email)
    if(isValid === false) return
    
    // 2. 가입환영 템플릿 만들기
    const welcomeTemplate = getWelcomeTemplate({ name, age, school, email })
  
    // 3. 이메일에 가입환영 템플릿 전송하기
    sendTemplateToEmail(email, welcomeTemplate)
  
    res.send("가입완료!!!")
  }
}