import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('increment')
  product_id: number;

  @Column({ type: 'varchar', length: 100 })
  ko_name: string;

  @Column({ type: 'varchar', length: 100 })
  en_name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  weight: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  kcal: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  sugar: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  protein: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  saturated_fat: number;

  @Column({ type: 'decimal', precision: 4, scale: 2 })
  salt: number;

  @Column({ type: 'int' })
  price: number;
}
