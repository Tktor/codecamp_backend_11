class 공중부품 {
  run = () => {
    console.log("날아서 도망가자!!!");
  }
}

class 지상부품 {
  run = () => {
    console.log("뛰어서 도망가자!!!");
  }
}

class Monster {
  power = 10 // 앞에 this 가 생략되어 있음
  부품

  constructor(qqq) {
    // 생성자 함수 - 처음 만들때 한번 실행
    this.부품 = qqq
  }

  attack = () => {
    console.log("공격하자!!");
    console.log("내 공격력은" + this.power + "야!!!");
  }

  run= () => {
    this.부품.run()
  }

}
// 설명서

// 몬스터 만들기
const myMonster1 = new Monster(new 공중부품())
//  객체(인스턴스)      설명서
myMonster1.attack()
myMonster1.run()

const myMonster2 = new Monster(new 지상부품())
myMonster2.attack()
myMonster2.run()