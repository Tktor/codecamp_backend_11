import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortOneService } from '../portone/portone.service';
import { User } from '../users/entities/user.entity';
import { Payments } from './entities/payment.entity';
import { PaymentsResolver } from './payment.resolver';
import { PaymentsService } from './payment.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Payments, //
      User,
    ]),
  ],
  providers: [
    PaymentsResolver, //
    PaymentsService,
    PortOneService,
  ],
})
export class PaymentsModule {}
