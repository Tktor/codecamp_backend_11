import { Request, Response } from 'express';
import { Context } from 'vm';

export interface IAuthUser {
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string;
  };
}

export interface IContext {
  req: Request & IAuthUser;
  res: Response;
}
