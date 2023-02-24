import {CashService} from './services/cash.service.js'
import {ProductService} from './services/product.service.js'


export class ProductController {

  buyProduct = (req, res) => { //미들웨어 함수
    // 1. 가진 돈 검증하는 코드 (대략 10줄 = 2줄)
    const cashService = new CashService()
    const hasMoney = cashService.checkValue()
    
    // 2. 판매 여부를 검증하는 코드(대략 10줄 = 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout()
  
    // 3. 상품 구매하는 코드
    if(hasMoney && !isSoldout) {
      res.send('상품 구매 완료!!')
    }
  }

  refundProduct = (req, res) => { //미들웨어 함수
    // 1. 판매 여부를 검증하는 코드(대략 10줄 = 2줄)
    const productService = new ProductService()
    const isSoldout = productService.checkSoldout()
  
    // 2. 상품 환불하는 코드
    if(isSoldout) {
      res.send('상품 환불 완료!!')
    }
  }

}