import { Module } from '@nestjs/common';
import { BoardsResolver } from './boards.resolver';
import { BoardsService } from './boards.service';

@Module({
  imports: [],
  providers: [
    BoardsResolver, //
    BoardsService, //
  ], // new AppController(AppService) 이런 의미
})
export class BoardsModule {}
