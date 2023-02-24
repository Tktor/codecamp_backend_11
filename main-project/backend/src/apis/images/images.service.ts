import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { Image } from './entities/image.entity';
import {
  IImagesServiceDelete,
  IImagesServiceUpdate,
  IImagesServiceUpload,
} from './interfaces/images-service.interface';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async createImage({
    productId,
    imagesUrl,
  }: IImagesServiceUpload): Promise<Image[]> {
    const imageUrls = await Promise.all(imagesUrl);
    // 받아온 제품아이디로 일단 제품을 찾아온다
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    const images = await Promise.all(
      imageUrls.map((el) => {
        return this.imagesRepository.save({ product, url: el });
      }),
    );

    return images;
  }

  async updateImage({
    productId,
    imagesUrl,
  }: IImagesServiceUpdate): Promise<Image[]> {
    const result = await this.imagesRepository.findOne({
      where: { id: productId },
    });
    const imageUpdate = await Promise.all(
      imagesUrl.map((el) => {
        return this.imagesRepository.save({ result, url: el });
      }),
    );
    return imageUpdate;
  }

  async deleteImage({ imageId }: IImagesServiceDelete): Promise<boolean> {
    const result = await this.imagesRepository.softDelete({ id: imageId });
    return result.affected ? true : false;
  }
}
