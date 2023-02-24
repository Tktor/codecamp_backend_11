import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// import {KakaoStrategy} from 'passport-kakao'
// import {NaverStrategy} from 'passport-naver'
// import {GoogleStrategy} from 'passport-google'

// 1. 비밀번호 검증, 2. 만료시간 검증
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() {
    super({
      // jwtFromRequest: (req) => {
      //   const temp = req.headers.Authorization; // Bearer sadasdasdsa
      //   const accessToken = temp.toLowerCase().replace('bearer ', '');
      //   return accessToken;
      // },
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의 비밀번호',
    });
  }

  validate(payload) {
    console.log(payload); // { sub: ASdasdad(유저ID) }

    return {
      id: payload.sub,
    };
  }
}
