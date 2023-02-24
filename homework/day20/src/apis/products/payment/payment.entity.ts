import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from '../entities/product.entity';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('increment')
  order_id: number;

  @Column({ type: 'varchar', length: 100 })
  address: string;

  @Column({ type: 'int' })
  payment_price: number;

  @Column({ default: false })
  is_payment: boolean;

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
