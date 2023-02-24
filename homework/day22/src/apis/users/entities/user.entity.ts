import { Field, ObjectType } from '@nestjs/graphql';
import { Payment } from 'src/apis/products/payment/payment.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  name: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  email: string;

  @Column({ type: 'varchar' })
  // @Field(() => String)
  password: string;

  @JoinColumn()
  @OneToMany(() => Payment, (payment) => payment.user)
  payment: Payment[];

  @DeleteDateColumn()
  deletedAt: Date;
}
