import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateStarbucksInput } from './dto/create-starbucks.input';
import { Starbucks } from './entities/starbucks.entity';
import { StarbucksService } from './starbucks.service';

@Resolver()
export class StarbucksResolver {
  constructor(
    private readonly starbucksService: StarbucksService, //
  ) {}

  @Query(() => [Starbucks], { nullable: true })
  fetchStarbucks(): Starbucks[] {
    return this.starbucksService.findAll();
  }

  @Mutation(() => String)
  createStarbucks(
    // @Args('writer') writer: string,
    // @Args('title') title: string,
    // @Args({ name: 'contents', nullable: true }) contents: string,
    @Args('createStarbucksInput') createStarbucksInput: CreateStarbucksInput,
  ): string {
    return this.starbucksService.create({ createStarbucksInput });
  }
}
