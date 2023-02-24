// 안좋은 예
// function createTokenOfPhone(qqq) { // qqq : 매개변수(parameter)
//   // 1. 휴대폰 번호 자리수 맞는지 확인(10~11자리)
//   if(qqq.length >= 10) {
//     if(qqq.length <= 11) {

//       // 2. 핸드폰 토큰 6자리 만들기
//       const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
//       console.log(result)

//       // 3. 핸드폰 번호에 토큰 전송하기
//       console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");

//     } else {
//       console.log("에러 발생!!!! 핸드폰 번호를 제대로 입력해주세요!!!");
//     }
//   } else {
//     console.log("에러 발생!!!! 핸드폰 번호를 제대로 입력해주세요!!!");
//   }
// }




// 좋은 예
function createTokenOfPhone(qqq) { // qqq : 매개변수(parameter)
  // 1. 휴대폰 번호 자리수 맞는지 확인(10~11자리)
  if(qqq.length < 10 || qqq.length > 11) {
    console.log("에러 발생!!!! 핸드폰 번호를 제대로 입력해주세요!!!"); //early-exit  패턴 : 에러를 먼저 실행하여 코드를 간결하게!!!!
    return
  }
  // 2. 핸드폰 토큰 6자리 만들기
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
  console.log(result)

  // 3. 핸드폰 번호에 토큰 전송하기
  console.log(qqq + "번호로 인증번호" + result + "를 전송합니다.");
}

createTokenOfPhone("01012345678") // 01012345678 : 인자(argument)