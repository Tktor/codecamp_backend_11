import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

interface IOAuthUser {
  user: {
    name: string;
    email: string;
    hashedPassword: string;
    age: number;
  };
}

@Controller()
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('google'))
  @Get('/login/google')
  async loginGoogle(@Req() req: Request & IOAuthUser, @Res() res: Response) {
    // 1. 회원 조회
    let user = await this.usersService.findOne({ email: req.user.email });

    // 2. 회원가입이 안되어있다면? 자동 회원 가입
    if (!user) user = await this.usersService.create({ ...req.user });

    this.authService.setRefreshToken({ user, res });
    res.redirect(
      'http://127.0.0.1:5500/class/section11/11-06-google-login/frontend/social-login.html',
    );
  }
}
