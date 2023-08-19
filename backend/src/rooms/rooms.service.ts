import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class RoomsService {
    private Rooms= join(__dirname, '../../data/Rooms.json')
    getAll(){
    return this.Rooms
    }
    create(){

    }
}
