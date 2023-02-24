import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  ko_name: string;

  @Column({ type: 'varchar', length: 100 })
  @Field(() => String)
  en_name: string;

  @Column({ type: 'text' })
  @Field(() => String)
  description: string;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field()
  weight: number;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field(() => Float)
  kcal: number;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field(() => Float)
  sugar: number;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field(() => Float)
  protein: number;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field(() => Float)
  saturated_fat: number;

  @Column({ type: 'decimal', precision: 5, scale: 1 })
  @Field(() => Int)
  salt: number;

  @Column({ type: 'int' })
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  isSoldOut: boolean;
}
