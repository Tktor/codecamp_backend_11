import {
  Inject,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import {
  IAuthServiceGetAccessToken,
  IAuthServiceLogin,
  IAuthServiceLogOut,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthSocialLogin,
} from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,

    private readonly usersService: UsersService, //

    @Inject(CACHE_MANAGER)
    private readonly cacheManger: Cache,
  ) {}

  async login({
    email,
    password,
    context,
  }: IAuthServiceLogin): Promise<string> {
    const user = await this.usersService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');
    const isAuth = await bcrypt.compare(password, user.password);
    if (!isAuth) throw new UnprocessableEntityException('암호가 틀렸습니다.');
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_REFRESH_KEY, expiresIn: '2w' },
    );
    this.setRefreshToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }

  async logOut({ context }: IAuthServiceLogOut): Promise<string> {
    const accessToken = context.req.headers.authorization.split(' ')[1];
    const refreshToken = context.req.headers.cookie.split('=')[1];

    try {
      const redisAccessToken = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_KEY,
        (error, result) => {
          if (!accessToken) {
            throw new UnauthorizedException('이미 로그아웃 된 유저입니다!');
          }
          return result;
        },
      );
      await this.cacheManger.set(`accessToken:${accessToken}`, accessToken, {
        ttl: redisAccessToken['exp'] - redisAccessToken['iat'],
      });

      const redisRefreshToken = jwt.verify(
        refreshToken,
        process.env.JWT_ACCESS_KEY,
        (error, result) => {
          if (!refreshToken) {
            throw new UnauthorizedException('이미 로그아웃 된 유저입니다!');
          }
          return result;
        },
      );
      await this.cacheManger.set(`refreshToken:${refreshToken}`, refreshToken, {
        ttl: redisRefreshToken['exp'] - redisAccessToken['iat'],
      });
      return '로그아웃에 성공하였습니다!';
    } catch (error) {
      console.error('에러입니다!');
      throw new UnauthorizedException();
    }
  }

  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string {
    return this.getAccessToken({ user });
  }

  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '1h' },
    );
  }

  setRefreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: process.env.JWT_ACCESS_KEY, expiresIn: '2w' },
    );
    res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
  }

  async socialLogin({ req, res }: IAuthSocialLogin): Promise<void> {
    let user = await this.usersService.findOne({
      userId: req.user.email,
    });

    if (!user) user = await this.usersService.create({ ...req.user });

    this.setRefreshToken({ user, res });
    res.redirect(
      'http://localhost:5500/main-project/frontend/login/index.html',
    );
  }
}
