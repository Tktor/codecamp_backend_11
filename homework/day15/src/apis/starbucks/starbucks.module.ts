import { Module } from '@nestjs/common';
import { StarbucksResolver } from './starbucks.resolver';
import { StarbucksService } from './starbucks.service';

@Module({
  imports: [],
  providers: [
    StarbucksResolver, //
    StarbucksService, //
  ], // new AppController(AppService) 이런 의미
})
export class StarbucksModule {}
