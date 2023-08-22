import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { RoomsService } from './rooms/rooms.service';

@Controller('Rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService){}
  @Get()
  getAll(@Res() res: Response){
    res.sendFile(this.roomsService.getAll())
  }
  @Post()
  create(@Body() Rooms: any){
    this.roomsService.create(Rooms)
    return {Message:'Room saved', Room: Rooms}
  }

}
