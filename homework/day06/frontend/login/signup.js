// 휴대폰 인증 토큰 전송하기
const getValidationNumber = async () => {
  document.querySelector('#ValidationInputWrapper').style.display = 'flex'
  const phone1 = document.getElementById('PhoneNumber01').value;
  const phone2 = document.getElementById('PhoneNumber02').value;
  const phone3 = document.getElementById('PhoneNumber03').value;
  console.log('인증 번호 전송')
  await axios.post("http://localhost:3000/tokens/phone", {
    phoneNumber: phone1 + phone2 + phone3
  })
}

// 회원 가입 API 요청
const submitSignup = async () => {
  const name = document.getElementById('SignupName').value;
  const personal = document.getElementById('SignupPersonal').value;
  const phone1 = document.getElementById('PhoneNumber01').value;
  const phone2 = document.getElementById('PhoneNumber02').value;
  const phone3 = document.getElementById('PhoneNumber03').value;
  const prefer = document.getElementById('SignupPrefer').value;
  const email = document.getElementById('SignupEmail').value;
  const password = document.getElementById('SignupPwd').value;
  console.log('회원 가입 이메일 전송')
  await axios.post("http://localhost:3000/usersSignup", {
    name,
    personal,
    phoneNumber2: phone1 + phone2 + phone3,
    prefer,
    email,
    password
  })
  
}
