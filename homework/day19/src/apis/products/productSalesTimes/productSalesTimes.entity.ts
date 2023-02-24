import {
  Column,
  Entity,
  In,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../entities/product.entity';

@Entity()
export class ProductSalesTimes {
  @PrimaryGeneratedColumn('increment')
  product_sales_Times_id: number;

  @Column({ type: 'date' })
  product_sales_time: Date;

  @JoinColumn()
  @ManyToOne(() => Product)
  product: Product;
}
