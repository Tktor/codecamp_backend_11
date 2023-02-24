import { Request, Response } from 'express';
import { User } from 'src/apis/users/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interfaces/context';

export interface IAuthServiceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user: User;
  // context: IContext;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user: IAuthUser['user'];
}

export interface IAuthSocialLogin {
  req: Request & IAuthUser;
  res: Response;
}

export interface IOAuthUser {
  user: User;
  // user: {
  //   // name: string;
  //   // email: string;
  //   // password: string;
  // };
}

export interface IAuthServiceLogOut {
  context: IContext;
}
