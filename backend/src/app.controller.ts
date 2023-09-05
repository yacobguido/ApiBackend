import { Controller, Get, Res, Post, Delete, Put, Body, Param, HttpStatus, NotFoundException, BadRequestException } from '@nestjs/common';
import { Response } from 'express';
import {RoomsService} from './rooms/rooms.service';

@Controller('Rooms')
export class RoomsController {

  constructor(private roomsService: RoomsService){}

  @Get()
  getAll(@Res() res: Response ){
 try {
  const serviceResponse = this.roomsService.getAll();
  return res.status(HttpStatus.OK).send(serviceResponse)
 } catch (error) {
  throw new NotFoundException('Data not found')
 }
  }

  @Get(':numberRoom')
  getByNumberRoom(@Param('numberRoom') numberRoom: string, @Res() res: Response ){
  try {
    const parsedID = parseInt(numberRoom, 10);
    const serviceResponse = this.roomsService.getByNumberRoom(parsedID);
    if(serviceResponse.success){
      return res.status(HttpStatus.OK).send(serviceResponse)
    } else {
      return res.status(HttpStatus.NOT_FOUND).send(serviceResponse)
    }
  } catch (error) {
    throw new BadRequestException(`Cannot get room with number room ${numberRoom}`)
  }
  }

  @Post()
  create(@Body() Room: any, @Res() res: Response){
    try {
      const newRoom =this.roomsService.create(Room)
      return res.status(HttpStatus.CREATED).send({...newRoom})
    } catch (error) {
      throw new BadRequestException('Room creation failed')
    }
  }
  @Delete(':id')
  deleteByID(@Param('id') id: string, @Res() res:Response){
    try {
      const serviceResponse = this.roomsService.deleteByID(id);
      if(serviceResponse.success){
        return res.status(HttpStatus.OK).send({...serviceResponse})
      }
      else {
        return res.status(HttpStatus.NOT_FOUND).send({...serviceResponse})
      }
      
    } catch (error) {
      throw new NotFoundException('Delete failed')
    }
  }
  @Put(':numberRoom')
  updateByNumberRoom(@Param('numberRoom') numberRoom: string, @Body() body: any, @Res() res: Response){
    try {
      const parsedNumberRoom = parseInt(numberRoom, 10);
      const serviceResponse = this.roomsService.updateByNumberRoom(parsedNumberRoom, body);
      if(serviceResponse.success){
        return res.status(HttpStatus.OK).send({...serviceResponse, code: HttpStatus.OK})
      } else {
        return res.status(HttpStatus.NOT_FOUND).send({...serviceResponse, code: HttpStatus.NOT_FOUND})
      }
    } catch (error) {
      throw new BadRequestException(`Update failed`)
    }
  }
}


