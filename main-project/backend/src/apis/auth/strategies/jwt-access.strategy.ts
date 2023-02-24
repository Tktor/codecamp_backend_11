import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_ACCESS_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    console.log(payload);
    const accessToken = req.headers.authorization.split(' ')[1];
    const redisAccessToken = await this.cacheManger.get(
      `accessToken:${accessToken}`,
    );

    if (redisAccessToken) {
      throw new UnauthorizedException('이미 로그아웃 된 유저입니다.');
    }

    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
