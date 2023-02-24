import {
  HttpException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import axios from 'axios';
import {
  IPortOneServiceCancel,
  IPortOneServiceCheckPaid,
} from './interfaces/portone-service.interface';

@Injectable()
export class PortOneService {
  async getToken(): Promise<string> {
    try {
      const result = await axios.post(`https://api.iamport.kr/users/getToken`, {
        imp_key: process.env.POTONE_KEY,
        imp_secret: process.env.POTONE_SECRET,
      });
      return result.data.response.access_token;
    } catch (error) {
      throw new HttpException(
        error.response.data.message,
        error.response.data.status,
      );
    }
  }

  async checkPaid({ impUid, amount }: IPortOneServiceCheckPaid): Promise<void> {
    try {
      const token = await this.getToken();
      const result = await axios.get(
        `https://api.iamport.kr/payments/${impUid}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );
      if (amount !== result.data.response.amount)
        throw new UnprocessableEntityException('잘못된 결제 정보입니다!');
    } catch (error) {
      console.log(error.response);
      throw new HttpException(error.response.message, error.response.status);
    }
  }

  async cancel({ impUid }: IPortOneServiceCancel): Promise<number> {
    try {
      const token = await this.getToken();
      const result = await axios.post(
        'https://api.iamport.kr/payments/cancel',
        { imp_uid: impUid },
        { headers: { Authorization: token } },
      );
      console.log(result);
      return result.data.response.cancel_amount;
    } catch (error) {
      throw new HttpException(error.response.message, error.response.status);
    }
  }
}
