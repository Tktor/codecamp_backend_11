import { Injectable, NotFoundException } from '@nestjs/common';
import coolsms from 'coolsms-node-sdk';

@Injectable()
export class PhoneService {
  checkPhoneNumber({ phone }) {
    if (phone.length !== 10 && phone.length !== 11) {
      throw new NotFoundException('핸드폰 번호가 올바르지 않습니다!!!');
    } else {
      return true;
    }
  }

  createToken() {
    const Token = String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
    return Token;
  }

  sendToken({ phone, Token }) {
    try {
      const SMSkey = process.env.SMS_KEY;
      const SMSsecret = process.env.SMS_SECRET;
      const SMSsender = process.env.SMS_SENDER;
      const messageService = new coolsms(SMSkey, SMSsecret);

      const result = messageService.sendOne({
        to: phone,
        from: SMSsender,
        text: `인증번호 ${Token}를 입력해주세요.`,
        autoTypeDetect: true,
      });
      return '인증번호 전송 완료했습니다!';
    } catch (error) {
      throw new NotFoundException('인증번호 전송에 실패하였습니다!');
    }
  }
}
