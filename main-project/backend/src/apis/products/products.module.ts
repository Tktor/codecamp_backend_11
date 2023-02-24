import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from '../images/entities/image.entity';
import { ImagesService } from '../images/images.service';
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
      Image,
    ]),
  ],

  providers: [
    ProductsResolver, //
    ProductsService, //
    ProductsSalesTimesService,
    ImagesService,
  ],
})
export class ProductsModule {}
