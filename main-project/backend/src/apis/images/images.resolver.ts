import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Resolver()
export class ImageResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => [Image])
  createImage(
    @Args({ name: 'imagesUrl', type: () => [String] }) imagesUrl: string[],
    @Args('productId') productId: string,
  ) {
    return this.imagesService.createImage({ productId, imagesUrl });
  }

  @Mutation(() => [Image])
  updateImage(
    @Args({ name: 'imagesUrl', type: () => [String] }) imagesUrl: string[],
    @Args('productId') productId: string,
  ) {
    return this.imagesService.updateImage({ productId, imagesUrl });
  }

  @Mutation(() => Boolean)
  deleteImage(@Args('imageId') imageId: string): Promise<boolean> {
    return this.imagesService.deleteImage({ imageId });
  }
}
