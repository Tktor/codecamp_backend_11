function numError (num) {
  if(num.length > 14) {
    console.log("에러 발생!!! 개수를 제대로 입력하세요!!!")
    return false 
  } else {
    return true
  } 
}

function hpError (num) {
  if (num.includes('-') === false) {
    console.log("에러 발생!!! 형식이 올바르지 않습니다!!!")
    return false
  } else {
    return true
  }
}

function result (num) {
  const masking = num.split("-")[1].split("")[0] + "*".repeat(6)
  console.log(num.split("-")[0] + "-" + masking)
}

function customRegistrationNumber(num) {
  const isValid = numError(num)
  if(isValid === false) return

  const hasValid = hpError(num)
  if(hasValid === false) return

  result(num)
}

customRegistrationNumber("210510-1010101")