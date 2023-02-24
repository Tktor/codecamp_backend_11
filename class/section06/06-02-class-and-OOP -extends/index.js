// class Date {

//   qqq = 3

//   getFullYear() {

//   }

//   getMonth() {
    
//   }

// }


const date = new Date()
console.log(date.getFullYear())
console.log(date.getMonth() + 1)


class Monster {
  power = 10 // 앞에 this 가 생략되어 있음

  constructor(qqq) {
    // 생성자 함수 - 처음 만들때 한번 실행
    this.power = qqq
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은" + this.power + "야!!!");
  }

  run= () => {
    console.log("도망가자!!!");
  }

}
// 설명서

class 공중몬스터 extends Monster {
  // 오버라이딩(부모의 run을 덮어 쓰게 됨)
  
  constructor(aaa) {
    super(aaa + 1)
  }

  run = () => {
    console.log("날아서 도망가자!!");
  }
}

class 지상몬스터 extends Monster {
  // 오버라이딩(부모의 run을 덮어 쓰게 됨)

  constructor(bbb) {
    super(bbb)
  }

  run = () => {
    console.log("뛰어서 도망가자!!");
  }
}

// 몬스터 만들기
const myMonster1 = new 공중몬스터(20)
//  객체(인스턴스)      설명서
myMonster1.attack()
myMonster1.run()

const myMonster2 = new 지상몬스터(50)
myMonster2.attack()
myMonster2.run()