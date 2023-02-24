export function getToday() {
  const today = new Date()
  const date = new Date()
  const yyyy = date.getFullYear()
  const mm = date.getMonth() + 1
  const dd = date.getDate()

  return `${yyyy}-${mm}-${dd}` // 실제로는 new Date()를 사용해야함!!!!
}