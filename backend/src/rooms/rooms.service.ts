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
   create(Room: any): {success: boolean, message: string} {
    try {
        const newRoom = {id: createID(), ...Room};
        console.log(newRoom);
        const data = readParse();
        data.push(newRoom);
        fs.writeFileSync(this.Rooms, JSON.stringify(data, null, 2))
        return {message: `Room created id:${newRoom.id}`, success: true}
    } catch (error) {
        throw new Error("Created failed");
    }
  }
  deleteByID(id: string): {success: boolean, message: string}{
    try {
        const data = readParse();
        const roomFound = data.findIndex((Room: { id: number; }) => Room.id === Number(id))
        if(roomFound >= 0){
            data.splice(roomFound, 1)
            fs.writeFileSync(this.Rooms, JSON.stringify(data, null, 2))
            return {success: true, message: `Room with id: ${id}, was deleted`}
        } else {
            return {success: false, message: `Room with id: ${id}, was not found`}
        }
    } catch (error) {
        throw new Error(`Delete Failed`)
    }
    }
    
    updateByNumberRoom(numberRoom: number, body: any): {success: boolean, message: string, data?: any}{
        try {
            const data = readParse();
            const index = data.findIndex((room : {numberRoom : number}) => room.numberRoom === numberRoom)
            if(index >= 0){
                const editedRoom = {...data[index], ...body, numberRoom}
                data[index] = editedRoom
                fs.writeFileSync(this.Rooms, JSON.stringify(data, null, 2))
                return {success: true, message: `Room with number Room: ${numberRoom}, was edited`, data: editedRoom}
            } return {success: false, message: `Room with number Room: ${numberRoom}, was not found`};
        } catch (error) {
                throw new Error(`Update Failed`)
        }
    }
            
    getByNumberRoom(numberRoom: number) : {data?: any, success: boolean, message: string}{
        try {
            const data = readParse();
            const index = data.findIndex((room: { numberRoom: number; }) => room.numberRoom === numberRoom);
            if(index >= 0){
            return {success: true, message: 'Room found', data: data[index]}
            } else return {success: false, message: 'Room not found'}
        } catch (error) {
            throw new Error("Error getting Room");
        }
    }

}
