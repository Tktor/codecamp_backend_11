import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../users/users.service';
import { PhoneService } from './phone.service';

@Resolver()
export class PhoneResolver {
  constructor(
    private readonly phoneService: PhoneService,

    private readonly usersService: UsersService,
  ) {}

  @Mutation()
  sendTokenPhone(@Args('phone') phone: string) {
    // 핸드폰 번호 자릿수 검증
    this.phoneService.checkPhoneNumber({ phone });

    // 핸드폰 번호 맞으면 토큰 생성
    const Token = this.phoneService.createToken();

    // 토큰 전송
    const sendToken = this.phoneService.sendToken({ phone, Token });
  }
}
