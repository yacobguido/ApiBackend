import * as fs from 'fs'
import {join} from 'path'

export function readParse(){
    const Rooms = join(__dirname, '../../data/Rooms.json')
    const fileContent = fs.readFileSync(Rooms, 'utf-8');
    console.log(fileContent);
    return JSON.parse(fileContent);
}

export function createID(){
    const Rooms = readParse();
    const lastRoom = Rooms[Rooms.length - 1];
    const id = lastRoom.id + 1;
    return id;
}
