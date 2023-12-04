import { Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, IsArray, ValidateNested, IsOptional } from "class-validator";

class SubItemDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    name: string;

    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNotEmpty()
    @IsNumber()
    amount: number;
}

export class AddExpenseDto {
    @IsOptional()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsNotEmpty()
    @IsString()
    month: string;

    @Transform(({ value }) => {
        return Number(value);
    })
    @IsNotEmpty()
    @IsNumber()
    year: number;

    @IsOptional()
    @IsNumber()
    @Transform(({ value }) => {
        return Number(value);
    })
    totalEarn: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SubItemDto)
    expense: SubItemDto[];
}