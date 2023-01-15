function getToday() {
  const today = new Date()
  const year = today.getFullYear()
  const month =  ("0" + today.getMonth() + 1).slice(-2)
  const day = ("0" + today.getDate()).slice(-2)
  const hours = ("0" + today.getHours()).slice(-2)
  const minutes = ("0" + today.getMinutes()).slice(-2)
  const seconds = ("0" + today.getSeconds()).slice(-2)


  return `오늘은 ${year}년 ${month}월 ${day}일 ${hours}:${minutes}:${seconds}입니다. `
}

console.log(getToday());