import { CashService } from './services/cash.service.js'

export class CouponController {

  cashService

  constructor(cashService) {
    this.cashService = cashService
  }

  buyCoupon = (res, req) => {
    // 1. 가진 돈 검증하는 코드 (대략 10줄)
    // const cashService = new CashService()
    const hasMoney = this.cashService.checkValue()

    // 2. 상품권 구매하는 코드
    if(hasMoney) {
      res.send('상품권 구매 완료!!')
    }
  }
}