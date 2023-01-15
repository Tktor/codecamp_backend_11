function checkEmail(email) {
  if(email === undefined || email.includes("@") === false) {
    console.log("에러 발생!!!! 이메일 주소를 제대로 입력해주세요!!!")
    return false
  } else {
    return true
  }
} 

function result (num) {
  const masking = num.split("-")[1].split("")[0] + "*".repeat(6)
  const maskingNumber = num.split("-")[0] + "-" + masking
  return maskingNumber
}

function getWelcomeTemplate({ name, email, maskingResult, phoneNumber, favoriteSite }) {
  const myTemplate = `
    <html>
      <body>
        <h1>${name}님 가입을 환영합니다!!!</h1>
        <hr />
        <div>이메일 : ${email}</div>
        <div>주민번호 : ${maskingResult}</div>
        <div>휴대폰 번호 : ${phoneNumber}</div>
        <div>내가 좋아하는 사이트 : ${favoriteSite}</div>
      </body>
    </html>
  `
  return myTemplate
}

function sendTemplateToEmail(email, myTemplate) {
  console.log(email + "이메일로 가입환영템플릿" + myTemplate + "를 전송합니다.");
}

function createUser({ name, email, registrationNumber, phoneNumber, favoriteSite }) {
  // 1. 이메일이 정상인지 검증하기(1-존재여부, 2-"@"" 포함여부)
  const isValid = checkEmail(email)
  if(isValid === false) return

  // 주민번호 마스킹
  const maskingResult = result(registrationNumber)

  // 2. 가입환영 템플릿 만들기
  const welcomeTemplate = getWelcomeTemplate( {name, email, maskingResult, phoneNumber, favoriteSite} )

  // 3. 이메일에 가입환영 템플릿 전송하기
  sendTemplateToEmail(email, welcomeTemplate)

}

const name = "코드캠프"
const email = "support@codebootcamp.co.kr"
const registrationNumber = "210510-1010101"
const phoneNumber = "000-0000-0000"
const favoriteSite = "codebootcamp.co.kr"

createUser({ name, email, registrationNumber, phoneNumber, favoriteSite })