import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';

import { RoomsService } from './rooms/rooms.service';

@Controller('Rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService){}
  @Get()
  getAll(@Res() res: Response){
    const Rooms = this.roomsService.getAll()
    res.sendFile(Rooms)
  }

}
