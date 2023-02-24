import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsSalesTimesService } from '../productSalesTimes/productsSalesTimes.service';
import { UpdateProductInput } from './dto/update-product.input';
import { Product } from './entities/product.entity';
import {
  IProductsServiceCreate,
  IProductsServiceDelete,
  IProductsServiceFindOne,
  IProductsServiceRestore,
  IProductsServiceSoldOut,
  IProductsServiceUpdate,
} from './interfaces/products-service.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>, //

    private readonly productsSalesTimesService: ProductsSalesTimesService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      withDeleted: true,
      relations: ['productCategory', 'productSalesTimes'],
    });
  }

  findOne({ productId }: IProductsServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productCategory', 'productSalesTimes'],
    });
  }

  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    const { productCategoryId, productSalesTimes, ...product } =
      createProductInput;

    const result = await this.productsSalesTimesService.create({
      productSalesTimes,
    });
    console.log(productCategoryId);
    const result2 = this.productsRepository.save({
      ...product,
      productSalesTimes: result,
      productCategory: {
        id: productCategoryId,
      },
    });
    return result2;
  }

  async update({
    productId,
    updateProductInput,
  }: IProductsServiceUpdate): Promise<Product> {
    const product = await this.findOne({ productId });
    this.checkSoldOut({ product });
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput,
    });
    return result;
  }

  checkSoldOut({ product }: IProductsServiceSoldOut): void {
    if (product.isSoldOut) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다!');
    }
  }

  async delete({ productId }: IProductsServiceDelete): Promise<boolean> {
    const result = await this.productsRepository.softDelete({ id: productId });
    return result.affected ? true : false; //
  }

  async restore({ productId }: IProductsServiceRestore): Promise<boolean> {
    const result = await this.productsRepository.restore({ id: productId });
    return result.affected ? true : false; //
  }

  findAllWithDeleted(): Promise<Product[]> {
    return this.productsRepository.find({
      withDeleted: true,
      relations: ['productCategory', 'productSalesTimes'],
    });
  }
}
