import { Response } from 'express';
import { RoomsService } from './rooms/rooms.service';
export declare class RoomsController {
    private roomsService;
    constructor(roomsService: RoomsService);
    getAll(res: Response): void;
}
