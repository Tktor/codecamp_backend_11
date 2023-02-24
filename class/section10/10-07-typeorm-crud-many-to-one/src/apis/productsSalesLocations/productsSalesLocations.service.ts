import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSalesLocation } from './entities/productSalesLocation.entity';

@Injectable()
export class ProductsSalesLocationsService {
  constructor(
    @InjectRepository(ProductSalesLocation)
    private readonly productsSalesLocationsRepository: Repository<ProductSalesLocation>,
  ) {}

  create({ productSalesLocation }) {
    return this.productsSalesLocationsRepository.save({
      ...productSalesLocation,
    });
  }
}
