import { ProductCategory } from 'src/apis/productsCategory/entities/productCategory.entity';
import { ProductSalesLocation } from 'src/apis/productsSalesLocations/entities/productSalesLocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/product.Tags.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false })
  isSoldOut: boolean;

  @JoinColumn() //중심이 되는 테이블 쪽에 붙여줌(one to one 에서만)
  @OneToOne(() => ProductSalesLocation) // 어느 테이블이랑 연결할지 화살표 함수로 작성
  productSalesLocation: ProductSalesLocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable() // 매니 투 매니에서 중간 테이블 만들시에 붙여줌
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 연결되는 테이블에서 어떠한 명칭으로 가르키는지 화살표 함수로 적어줌
  productTags: ProductTag[];
}
