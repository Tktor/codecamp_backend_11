import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesTimes } from './productSalesTimes.entity';

@Injectable()
export class ProductsSalesTimesService {
  constructor(
    @InjectRepository(ProductSalesTimes)
    private readonly productsSalesTimesRepository: Repository<ProductSalesTimes>,
  ) {}

  create({ productSalesTimes }): Promise<ProductSalesTimes> {
    return this.productsSalesTimesRepository.save({
      ...productSalesTimes,
    });
  }
}
