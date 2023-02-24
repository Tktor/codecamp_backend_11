import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceCreate {
  // createUserInput: CreateUserInput;
  name: string;
  email: string;
  password: string;
}

export interface IUsersServiceUpdate {
  userId: string;
  updateUserInput: UpdateUserInput;
}

export interface IUsersServiceFindOneByEmail {
  email: string;
}

export interface IUserServiceFindOne {
  userId: string;
}

export interface IUserServiceDelete {
  userId: string;
}

export class IUserServiceUpdatePassword {
  userId: string;
  password: string;
}
