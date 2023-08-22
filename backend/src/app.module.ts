import { Module } from '@nestjs/common';
import { RoomsController } from './app.controller';
import { RoomsService } from './rooms/rooms.service';


@Module({
  imports: [],
  controllers: [RoomsController],
  providers: [RoomsService],
})
export class AppModule {}

