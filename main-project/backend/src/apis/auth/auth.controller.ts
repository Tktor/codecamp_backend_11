import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { DynamicAuthGuard } from './guards/dynamic-auth.guard-04';
import { IOAuthUser } from './interfaces/auth-service.interface';

@Controller()
export class AuthController {
  constructor(
    // private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  // 통합
  @UseGuards(DynamicAuthGuard)
  @Get('/login/:social')
  loginOAuth(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    req.params;
    this.authService.socialLogin({ req, res });
  }

  // // 구글
  // @UseGuards(AuthGuard('google'))
  // @Get('/login/google')
  // loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
  //   this.authService.socialLogin({ req, res });
  // }

  // //네이버;
  // @UseGuards(AuthGuard('naver'))
  // @Get('/login/naver')
  // loginNaver(@Req() req: Request & IOAuthUser, @Res() res: Response) {
  //   this.authService.socialLogin({ req, res });
  // }

  // // 카카오
  // @UseGuards(AuthGuard('kakao'))
  // @Get('/login/kakao')
  // loginKakao(@Req() req: Request & IOAuthUser, @Res() res: Response) {
  //   this.authService.socialLogin({ req, res });
  // }
}
