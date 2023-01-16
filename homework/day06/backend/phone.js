import coolsms from 'coolsms-node-sdk'
const mysms = coolsms.default

export function checkPhone (myphone) {
  if(myphone.length < 10 || myphone.length > 11) {
    console.log("에러 발생!!!! 핸드폰 번호를 제대로 입력해주세요!!!"); //early-exit  패턴 : 에러를 먼저 실행하여 코드를 간결하게!!!!
    return false
  } else {
    return true
  }
}

export function getToken () {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
  console.log(result)
  return result
}

export async function sendTokenToSMS(myphone, result) {
  const messageService = new mysms(process.env.MY_SMS_KEY, process.env.MY_SMS_SECRET)
  const res = await messageService.sendOne({
    to: myphone,
    from: process.env.MY_PHONENUMBER,
    text: ` [코드캠프] 안녕하세요?! 요청하신 인증 번호는 ${result} 입니다. `
  })

  console.log(res)
  // console.log(myphone + "번호로 인증번호" + result + "를 전송합니다.");
}



