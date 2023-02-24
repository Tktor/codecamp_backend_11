import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from '../files/files.service';
import { Product } from '../products/entities/product.entity';
import { Image } from './entities/image.entity';
import { ImageResolver } from './images.resolver';
import { ImagesService } from './images.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Image])],
  providers: [ImageResolver, ImagesService, FilesService],
})
export class ImageModule {}
