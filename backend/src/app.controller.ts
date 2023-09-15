import { Controller, Get, Res, Post, Delete, Put, Body, Param, HttpStatus, NotFoundException, BadRequestException, ValidationPipe, UsePipes} from '@nestjs/common';
import { Response } from 'express';
import {RoomsService} from './rooms/rooms.service';
import { Room } from './rooms/rooms.interface';
import { roomDto} from './rooms/room.dto';
import { room_idDTO } from './rooms/room_id.dto';


@Controller('Rooms')
export class RoomsController {

  constructor(private roomsService: RoomsService){}

  @Get()
  async getAll(@Res() res: Response ): Promise <Response <room_idDTO>> {
    try {
      const serviceResponse = await this.roomsService.getAll();
      return res.status(HttpStatus.OK).send(serviceResponse);
    } catch (error) {
      throw new NotFoundException('Data not found')
    }
  }

  @Get(':id')
  async getByID(@Param('id') id: number, @Res() res: Response ): Promise<Response<Room>> {
    try {
      const serviceResponse = await this.roomsService.getByID(id);
      if (serviceResponse) {
        return res.status(HttpStatus.OK).send({message:`Room found`, Room:serviceResponse})
      } else {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Room not found' });
      }
    } catch (error) {
      throw new BadRequestException(`Cannot get Room with id ${id}`);
    }
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() Room: roomDto,  @Res() res:Response): Promise <any> {
    try {
      const serviceResponse = await this.roomsService.create(Room)
      return res.status(HttpStatus.CREATED).send({message:`Room created`, Room:serviceResponse });
    } catch (error) {
      throw new BadRequestException('Room creation failed')
    }
  }
  @Delete(':id')
  async deleteByID(@Param('id') id: number, @Res() res:Response): Promise <any> {
    try {
      const serviceResponse = await this.roomsService.deleteByID(id);

      if (serviceResponse) {
        return res.status(HttpStatus.OK).send({message:`Room deleted`});
      } else {
        return res
        .status(HttpStatus.NOT_FOUND)
        .json({message:`Room not deleted`});
      }
    } catch (error) {
      throw new NotFoundException('Delete failed');
    }
  }
  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateByID(@Param('id') id: number, @Body() body: roomDto, @Res() res: Response): Promise <any> {
    try {
      const success = await this.roomsService.updateByID(id, body);

      if(success) {
        return res.status(HttpStatus.OK).send({
          message:`Room edited`,
          success
        });
      }else{
        return res
        .status(HttpStatus.NOT_FOUND)
        .json({message:`Room not edited`});
      }
    } catch (error) {
      throw new BadRequestException(`Update failed`);
    }
  }
}

