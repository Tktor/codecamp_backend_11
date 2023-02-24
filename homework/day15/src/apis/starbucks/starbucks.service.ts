import { Injectable, Scope } from '@nestjs/common';
import { Starbucks } from './entities/starbucks.entity';
import { IStarbucksServiceCreate } from './interface/starbucks-service.interface';

//                            의존성 주입할 수 있는
//                            인젝션-스코프 => 싱글톤(new 한 번)으로 할래 말래
//                                              Request 스코프(매 요청마다 new)로 할래?
//                                              Transient 스코프(매 주입마다  new)로 할래?

@Injectable({ scope: Scope.DEFAULT })
export class StarbucksService {
  findAll(): Starbucks[] {
    const result = [
      {
        menu: '아메리카노',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '카페라떼',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '콜드브루',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '캬라멜 마끼야또',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
      {
        menu: '바닐라 라떼',
        price: 100,
        kcal: 10,
        saturated_fat: 10,
        protein: 10,
        salt: 10,
        sugar: 10,
        caffeine: 10,
      },
    ];
    return result;
  }

  create({ createStarbucksInput }: IStarbucksServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createStarbucksInput.menu);
    console.log(createStarbucksInput.price);
    console.log(createStarbucksInput.kcal);
    console.log(createStarbucksInput.saturated_fat);
    console.log(createStarbucksInput.protein);
    console.log(createStarbucksInput.salt);
    console.log(createStarbucksInput.sugar);
    console.log(createStarbucksInput.caffeine);

    // 2. DB 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저에 응답(response) 주기
    return '등록에 성공하였습니다.';
  }
}
