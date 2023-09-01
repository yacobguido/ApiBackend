import { Injectable } from '@nestjs/common';
import { join} from 'path';
import * as fs from 'fs';
import { createID, readParse} from '../utils/utils';
@Injectable()
export class RoomsService {
    private Rooms= join(__dirname, '../../data/Rooms.json')
    getAll(){
      try {
        return readParse();
    } catch (error) {
        throw new Error('Cannot get data')
    }
    }
    getByNumberRoom(numberRoom: number) : {data?: any, success: boolean, message: string}{
      try {
          const data = readParse();
          const index = data.findIndex((Room: { numberRoom: number; }) => Room.numberRoom === numberRoom);
          if(index >= 0){
              return {success: true, message: 'Room found', data: data[index]}
          } else return {success: false, message: 'Room not found'}
      } catch (error) {
          throw new Error("Error getting room");
      }
  }
  async create(Room: any){
    try {
        const newRoom = {id: createID(), ...Room};
        console.log(newRoom);
        const data = readParse();
        data.push(newRoom);
        fs.writeFileSync(this.Rooms, JSON.stringify(data, null, 2))
        return {message: "Room created", data: newRoom, success: true}
    } catch (error) {
        throw new Error("Created failed");
    }
  }
  deleteByNumberRoom(numberRoom: string): {success: boolean, message: string}{
    try {
        const data = readParse();
        const roomFound = data.findIndex((Room: { numberRoom: number; }) => Room.numberRoom === Number(numberRoom))
        if(roomFound >= 0){
            data.splice(roomFound, 1)
            fs.writeFileSync(this.Rooms, JSON.stringify(data, null, 2))
            return {success: true, message: `Room with number room: ${numberRoom}, was deleted`}
        } else {
            return {success: false, message: `Room with number room: ${numberRoom}, was not found`}
        }
    } catch (error) {
        throw new Error(`Delete Failed`)
    }
        }
    


}
