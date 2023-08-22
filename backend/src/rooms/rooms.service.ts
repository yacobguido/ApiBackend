import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { readParse } from '../utils/utils';

@Injectable()
export class RoomsService {
    private Rooms= join(__dirname, '../../data/Rooms.json')
    getAll(){
        console.log(this.Rooms)
    return this.Rooms
    }
    async create(Room: any){
        try {
            const newRoom = {...Room};
            const data = readParse();
            data.push(newRoom);
            fs.writeFileSync(this.Rooms,
            JSON.stringify(data, null, 2 ))
            const Data = fs.readFileSync(this.Rooms, 'utf-8');
            console.log (Data);
          } catch (error) {
            console.log(error);
          }
    }
    


}
