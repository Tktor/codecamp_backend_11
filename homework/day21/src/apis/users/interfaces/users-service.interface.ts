import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';

export interface IUsersServiceCreate {
  createUserInput: CreateUserInput;
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
