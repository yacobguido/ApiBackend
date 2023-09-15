import {IsInt, IsString, IsOptional, IsNotEmpty} from 'class-validator';
import { Expose } from 'class-transformer';
export class room_idDTO{
    @Expose()
    @IsInt()
    @IsNotEmpty()
    id: number;

    @Expose()
    @IsInt()
    @IsNotEmpty()
    numberRoom: number;
    
    @Expose()
    @IsString()
    @IsNotEmpty()
    type: string;

    @Expose()
    @IsInt()
    @IsNotEmpty()
    pax: number;

    @Expose()
    @IsString()
    @IsNotEmpty()
    category: string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    status: string;
}