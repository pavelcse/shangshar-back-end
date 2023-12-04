import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ListExpenseDto {
    @IsNotEmpty()
    @IsString()
    month: string;

    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}