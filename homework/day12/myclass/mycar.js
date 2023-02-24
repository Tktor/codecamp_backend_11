class MyFirstCar {
  constructor(model, power, color) {
    this.model = model;
    this.power = power;
    this.color = color;
  }

  start = () => {
    console.log("출발하겠습니다.");
  };
  stop = () => {
    console.log("정지하겠습니다.");
  };
  left = () => {
    console.log("좌회전하겠습니다.");
  };
  right = () => {
    console.log("우회전하겠습니다.");
  };
}

const myCar1 = new MyFirstCar("sportage", 180, "white");
const myCar2 = new MyFirstCar("genesis", 272, "black");
myCar1.left()
myCar1.start()