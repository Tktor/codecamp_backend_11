import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { ProductSalesTimes } from '../productSalesTimes/productSalesTimes.entity';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  ko_name: string;

  @Field(() => String)
  en_name: string;

  @Field(() => String)
  description: string;

  @Min(0)
  @Field(() => Int)
  price: number;

  @Field()
  weight: number;

  @Field(() => Float)
  kcal: number;

  @Field(() => Float)
  sugar: number;

  @Field(() => Float)
  protein: number;

  @Field(() => Float)
  saturated_fat: number;

  @Field(() => Float)
  salt: number;

  @Field(() => ProductSalesTimes)
  productSalesLocation: ProductSalesTimes;
}
