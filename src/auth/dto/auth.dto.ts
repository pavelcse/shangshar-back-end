import { IsString, IsEmail } from "class-validator";

export class CreateLoginDto {
    @IsString()
    @IsEmail()
    username: string;

    @IsString()
    password: string;
}