
import *as fs from 'fs';
import { join } from 'path';

export function readParse(){
    const Rooms= join(__dirname, '../../data/Rooms.json')
    const fileContent = fs.readFileSync(Rooms, 'utf-8');
    return JSON.parse(fileContent);
}
