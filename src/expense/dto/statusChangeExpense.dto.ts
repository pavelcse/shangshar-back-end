import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class StatusChangeExpenseDto {
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @IsNotEmpty()
    @IsBoolean()
    isCompleted: boolean;

    @IsNotEmpty()
    @IsNumber()
    remainingBalcnce: number;

    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    InStock: number;
}