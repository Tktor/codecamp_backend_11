import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IUserServiceDelete,
  IUserServiceFindOne,
  IUserServiceUpdatePassword,
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
  IUsersServiceUpdate,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne({ userId }: IUserServiceFindOne): Promise<User> {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({ ...createUserInput }: IUsersServiceCreate): Promise<User> {
    const { name, email, phone, password } = createUserInput;
    const user = await this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일입니다.');
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = this.userRepository.save({
      name,
      email,
      phone,
      password: hashedPassword,
    });
    console.log(result);
    return result;
  }

  async update({
    userId,
    updateUserInput,
  }: IUsersServiceUpdate): Promise<User> {
    const user = await this.findOne({ userId });
    const result = this.userRepository.save({
      ...user,
      ...updateUserInput,
    });
    return result;
  }

  async updatePassword({
    userId,
    password,
  }: IUserServiceUpdatePassword): Promise<User> {
    const user = await this.findOne({ userId });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await this.userRepository.save({
      ...user,
      password: hashedPassword,
    });
    return result;
  }

  async delete({ userId }: IUserServiceDelete): Promise<boolean> {
    const result = await this.userRepository.softDelete({ id: userId });
    return result.affected ? true : false;
  }
}
