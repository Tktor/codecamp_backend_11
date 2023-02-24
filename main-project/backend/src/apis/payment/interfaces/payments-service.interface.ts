import { IAuthUser } from 'src/commons/interfaces/context';
import {
  Payments,
  POINT_TRANSACTION_STATUS_ENUM,
} from '../entities/payment.entity';

export interface IPaymentsServiceFindOneByImpUid {
  impUid: string;
}

export interface IPaymentsServiceCheckDuplication {
  impUid: string;
}

export interface IPaymentsServiceCreate {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
  status?: POINT_TRANSACTION_STATUS_ENUM;
}

export interface IPaymentsServiceCreateForPayment {
  impUid: string;
  amount: number;
  user: IAuthUser['user'];
}

export interface IPaymentsServiceFindByImpUidAndUser {
  impUid: string;
  user: IAuthUser['user'];
}

export interface IPaymentsServiceCheckAlreadyCanceled {
  payments: Payments[];
}

export interface IPaymentsServiceCheckHasCancelablePay {
  payments: Payments[];
}

export interface IPaymentsServiceCancel {
  impUid: string;
  user: IAuthUser['user'];
}
