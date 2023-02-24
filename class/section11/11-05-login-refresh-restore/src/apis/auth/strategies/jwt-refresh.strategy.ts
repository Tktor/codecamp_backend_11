import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import {KakaoStrategy} from 'passport-kakao'
// import {NaverStrategy} from 'passport-naver'
// import {GoogleStrategy} from 'passport-google'

// 1. 비밀번호 검증, 2. 만료시간 검증
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie; // refreshToKen=asasdadqdadasda
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: '나의 리프레쉬 비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // { sub: ASdasdad(유저ID) }

    return {
      id: payload.sub,
    };
  }
}
