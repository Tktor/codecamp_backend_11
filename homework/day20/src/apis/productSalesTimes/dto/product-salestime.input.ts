import { Field, InputType, OmitType } from '@nestjs/graphql';
import { ProductSalesTimes } from '../productSalesTimes.entity';

@InputType()
export class ProductSalesTimeInput extends OmitType(
  ProductSalesTimes,
  ['id'],
  InputType,
) {}
