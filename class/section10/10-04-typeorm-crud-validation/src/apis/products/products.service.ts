import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceFindOne,
  IProductsServiceSoldout,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) // 싱글톤
    private readonly productsRepository: Repository<Product>, //
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  create({ createProductInput }: IProductsServiceCreate): Promise<Product> {
    const result = this.productsRepository.save({
      ...createProductInput,

      // 하나 하나 직접 나열하는 방식
      // name: '마우스',
      // description: '좋은 마우스',
      // price: 3000,
    });

    // result 안에는 무엇이 있을까?
    // result = {
    //     id: 'asdasdasdasdasdsa-dasdasdasdd'
    //     name: '마우스',
    //     description: '좋은 마우스',
    //     price: 3000,
    // }

    return result;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    // 기존 있는 내용을 재사용하여 로직을 통일하자!!
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 하자!!
    this.checkSoldout({ product });

    // this.productsRepository.create(); // DB 접속이랑 관련 없음(등록을 위한 빈 껍데기 객체를 만들기 위함)
    // this.productsRepository.insert(); // 등록은 하지만 결과를 객체로 못 돌려 받는 등록 방법
    // this.productsRepository.update(); // 수정은 하지만 결과를 객체로 못 돌려 받는 수정 방법

    const result = this.productsRepository.save({
      // 등록: 아이디 없으면 , 수정: 아이디 있으면
      ...product, // 수정 후, 수정되지 않은 다른 결과값까지 모두 객체로 돌려 받고 싶을 때
      // id: product.id,
      // isSoldout: product.isSoldOut,
      // name: product.name,
      // description: product.description,
      // price: product.price,
      ...updateProductInput,
      // name: updateProductInput.name,
      // description: updateProductInput.description,
      // price: updateProductInput.price,
    });
    return result;
  }
  // checkSoldout을 함수로 만드는 이유 => 수정, 삭제 시 같은 검증 로직 사용
  checkSoldout({ product }: IProductsServiceSoldout): void {
    if (product.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다!');
    }

    // if (product.isSoldOut) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다!',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }
}
