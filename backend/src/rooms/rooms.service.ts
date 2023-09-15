import { Injectable } from '@nestjs/common';
import { Room } from './rooms.interface';
import { roomDto} from './room.dto';
const BASE_URL = 'http://localhost:3030/Rooms/';
@Injectable()
export class RoomsService {
    async getAll(): Promise<Room[]> {
        const res = await fetch(BASE_URL);
        const parsed = await res.json();
        return parsed;
    }
    async getByID(id: number) : Promise <Room> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        return parsed;
    }
   async create(Room: roomDto): Promise <any> {
    try {
        const id = await this.setRoom();
        const { numberRoom, type, pax, category, status } = Room;
        const newRoom = { id, numberRoom, type, pax, category, status };
        const res = await fetch(BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newRoom),
        });
        const parsed = await res.json();
        return parsed;
      } catch (error) {
        throw new Error('Room creation failed');
      }
  }
  async deleteByID(id: number): Promise<any>{
    const res = await fetch(BASE_URL + id, {
        method: 'DELETE',
      });
  
      if (!res.ok) {
        throw new Error('Failed to delete Room');
      }
  
      const parsed = await res.json();
      return parsed;
    }
    
    async updateByID(id: number, body: roomDto): Promise<any>{
        const isRoom = await this.getByID(id);

        if (!Object.keys(isRoom).length) {
          return false;
        }
    
        const updatedRoom = {
          numberRoom: body.numberRoom,
          type: body.type,
          pax: body.pax,
          category: body.category,
          status: body.status
        };
    
        const res = await fetch(BASE_URL + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedRoom),
        });
    
        if (!res.ok) {
          throw new Error('Failed to update Room');
        }
    
        return updatedRoom;
    }
            
    private async setRoom(): Promise<number> {
        const rooms = await this.getAll();
        const id = rooms.pop().id + 1;
        return id;
      }

}
