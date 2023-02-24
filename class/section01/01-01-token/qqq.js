console.log("안녕하세요!!")

function getToken () {
  const result = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
  // Math.random으로 0~1 사이의 숫자를 받아오고 백만을 곱해 6자리만 받아오고 그 뒤의 숫자는 필요가 없어 Math.floor로 나ㅁ지 소숫점을 제거한다.
  // 6자리 번호를 받아오기 위해 백만을 곱하는데 앞자리가 0인 경우는 숫자에 포함이 되지 않기 때문에 String().padStart로 최대 6자리에서 빈칸은 0으로 정의해준다.
  console.log(result)
}

getToken()
