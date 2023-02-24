import { UseGuards } from '@nestjs/common';
import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { IContext } from 'src/commons/interfaces/context';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guards';
import { Payments } from './entities/payment.entity';
import { PaymentsService } from './payment.service';

@Resolver()
export class PaymentsResolver {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payments)
  createPayment(
    @Args('impUid') impUid: string, //
    @Args({ name: 'amount', type: () => Int }) amount: number,
    @Context() context: IContext,
  ): Promise<Payments> {
    const user = context.req.user;
    return this.paymentsService.createForPayment({ impUid, amount, user });
  }

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Payments)
  cancelPayment(
    @Args('impUid') impUid: string, //
    @Context() context: IContext,
  ) {
    const user = context.req.user;
    return this.paymentsService.cancel({ impUid, user });
  }
}
