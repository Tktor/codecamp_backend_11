import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver()
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService, //
  ) {}

  @Query(() => [User])
  fetchUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchUser(@Context() context: IContext): Promise<User> {
    const userId = context.req.user.id;
    return this.usersService.findOne({ userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchLoginUser(@Context() context: IContext): Promise<User> {
    const userId = context.req.user.id;
    return this.usersService.findOne({ userId });
  }

  @Mutation(() => User)
  createUser(
    @Args('createUserInput') createUserInput: CreateUserInput,
  ): Promise<User> {
    return this.usersService.create({ ...createUserInput });
  }

  @Mutation(() => User)
  updateUser(
    @Args('userId') userId: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.usersService.update({ userId, updateUserInput });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => User)
  updateUserPwd(
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<User> {
    const userId = context.req.user.id;
    return this.usersService.updatePassword({ userId, password });
  }

  @Mutation(() => Boolean)
  deleteUser(@Args('userId') userId: string): Promise<boolean> {
    return this.usersService.delete({ userId });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Boolean)
  deleteLoginUser(@Context() context: IContext): Promise<boolean> {
    console.log(context);
    const userId = context.req.user.id;
    return this.usersService.delete({ userId });
  }
}
