import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../entities/product.entity';

@Entity()
export class Image {
  @PrimaryGeneratedColumn('increment')
  image_id: number;

  @Column({ type: 'varchar', length: 100 })
  image_url: string;

  @Column({ default: false })
  main_image_url: boolean;

  @ManyToOne(() => Product)
  product: Product;
}
