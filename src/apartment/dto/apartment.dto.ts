import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchPerimeterDto {
    @IsNotEmpty()
    @IsNumber()
    lat: number;
    @IsNotEmpty()
    @IsNumber()
    lng: number;
    @IsNotEmpty()
    @IsNumber()
    radius: number;
}
export class RegisterDto {
    @IsString()
    @IsNotEmpty()
    city: string;
    @IsNumber()
    @IsNotEmpty()
    lat: number;
    @IsNumber()
    @IsNotEmpty()
    lng: number;
    @IsNumber()
    @IsNotEmpty()
    rooms: number;
    @IsString()
    @IsNotEmpty()
    country: string;
    @IsString()
    @IsNotEmpty()
    urbanId: string;
}
