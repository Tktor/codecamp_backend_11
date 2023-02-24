interface IProfile {
  name: string;
  age: number;
  school: string;
  hobby?: string;
}

// 1. Partial 타입
type aaa = Partial<IProfile>;

// 2. Required 타입
type bbb = Required<IProfile>;

// 3. Pick 타입
type ccc = Pick<IProfile, "name" | "age">;

// 4. Omit 타입
type ddd = Omit<IProfile, "school">;

// 5. Record 타입
type eee = "철수" | "영희" | "훈이"; // Union 타입
let child1: eee = "철수"; // 철수, 영희, 훈이만 가능
let child2: string = "사과"; // 철수, 영희, 훈이, 사과 바나나 등 문자열 모두 가능

type fff = Record<eee, IProfile>; // Recode 타입

// 6. 객체의 key들로 Union 타입 만들기
type ggg = keyof IProfile; // "name" | "age" | "school" | "hobby"
let myProfile: ggg = "hobby";

// 7. type vs interface의 차이   =>    Interface는 선언 병합 가능
interface IProfile {
  candy: number; // 선언 병합으로 추가 됨
}

// 8. 배운 것 응용
let profile: Partial<IProfile> = {
  candy: 10,
};
