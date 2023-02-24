import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSalesTimes } from '../productSalesTimes/productSalesTimes.entity';
import { ProductsSalesTimesService } from '../productSalesTimes/productsSalesTimes.service';
import { Product } from './entities/product.entity';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSalesTimes,
    ]),
  ],

  providers: [
    ProductsResolver, //
    ProductsService, //
    ProductsSalesTimesService,
  ],
})
export class ProductsModule {}
