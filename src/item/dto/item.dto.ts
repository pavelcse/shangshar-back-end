import { Transform } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsOptional } from "class-validator";

export class InsertItemDto {
    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => {
      return Number(value);
    })
    id: number;

    @IsNotEmpty()
    @IsString()
    item: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => {
        return Number(value);
      })
    cost: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;
}