import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PortOneService } from '../portone/portone.service';

import { User } from '../users/entities/user.entity';
import {
  Payments,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/payment.entity';
import {
  IPaymentsServiceCancel,
  IPaymentsServiceCheckAlreadyCanceled,
  IPaymentsServiceCheckDuplication,
  IPaymentsServiceCheckHasCancelablePay,
  IPaymentsServiceCreate,
  IPaymentsServiceCreateForPayment,
  IPaymentsServiceFindByImpUidAndUser,
  IPaymentsServiceFindOneByImpUid,
} from './interfaces/payments-service.interface';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly portOneService: PortOneService,

    private readonly dataSource: DataSource,
  ) {}

  findOneByImpUid({
    impUid,
  }: IPaymentsServiceFindOneByImpUid): Promise<Payments> {
    return this.paymentsRepository.findOne({ where: { impUid } });
  }

  async checkDuplication({
    impUid,
  }: IPaymentsServiceCheckDuplication): Promise<void> {
    const result = await this.findOneByImpUid({ impUid });
    if (result) throw new ConflictException('이미 등록된 결제 아이디입니다!');
  }

  async create({
    impUid,
    amount,
    user: _user,
    status = POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
  }: IPaymentsServiceCreate): Promise<Payments> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const payments = this.paymentsRepository.create({
        impUid,
        amount,
        user: _user,
        status,
      });
      // await this.paymentsRepository.save(payments);
      await queryRunner.manager.save(payments);

      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id }, // row-lock
        lock: { mode: 'pessimistic_write' },
      });

      const updatedUser = this.usersRepository.create({
        ...user,
        pay: user.pay + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      return payments;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createForPayment({
    impUid,
    amount,
    user,
  }: IPaymentsServiceCreateForPayment): Promise<Payments> {
    await this.portOneService.checkPaid({ impUid, amount });
    await this.checkDuplication({ impUid });

    return this.create({ impUid, amount, user });
  }

  findByImpUidAndUser({
    impUid,
    user,
  }: IPaymentsServiceFindByImpUidAndUser): Promise<Payments[]> {
    return this.paymentsRepository.find({
      where: { impUid, user: { id: user.id } },
      relations: ['user'],
    });
  }

  checkAlreadyCanceled({
    payments,
  }: IPaymentsServiceCheckAlreadyCanceled): void {
    const canceledPayments = payments.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.CANCEL,
    );
    if (canceledPayments.length)
      throw new ConflictException('이미 취소된 결제 아이디입니다!');
  }

  checkHasCancelablePay({
    payments,
  }: IPaymentsServiceCheckHasCancelablePay): void {
    const paidPayments = payments.filter(
      (el) => el.status === POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
    );
    if (!paidPayments.length)
      throw new UnauthorizedException('결제 기록이 존재하지 않습니다!');

    if (paidPayments[0].user.pay < paidPayments[0].amount)
      throw new UnauthorizedException('돈이 부족합니다!');
  }

  async cancel({ impUid, user }: IPaymentsServiceCancel): Promise<Payments> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const payments = await this.findByImpUidAndUser({ impUid, user });
      this.checkAlreadyCanceled({ payments });
      this.checkHasCancelablePay({ payments });

      const canceledAmount = await this.portOneService.cancel({ impUid });
      await queryRunner.commitTransaction();

      return this.create({
        impUid,
        amount: -canceledAmount,
        user,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
