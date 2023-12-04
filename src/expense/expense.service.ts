import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListExpenseDto } from './dto/listExpense.dto';
import { AddExpenseDto } from './dto/addExpense.dto';
import { CustomException } from 'src/CustomException/CustomException';
import { StatusChangeExpenseDto } from './dto/statusChangeExpense.dto';

@Injectable()
export class ExpenseService {
    constructor(private prisma: PrismaService){}

    async getExpenseByUserAndMonth(authId: number, dto: ListExpenseDto) {
        if(authId !== dto.userId) throw new UnauthorizedException("Unauthorize User");

        const allExpenses = await this.prisma.month.findFirst({
            where: {
                userId: dto.userId,
                month: dto.month,
                year: dto.year
            },
            include: {
                expense: true,
                user: true,
              },
        });
        if(!allExpenses) throw new CustomException('No Record Found!');

        return allExpenses;
    }

    async addExpense(authId: number, dto: AddExpenseDto) {
        if(authId !== dto.userId) throw new UnauthorizedException("Unauthorize User");
        if(dto.id) {
            const expense = await this.prisma.month.update({
                where: { id: dto.id },
                data: 
                {
                    expense: {
                        create: dto.expense
                    }
                },
                include: {
                    expense: true,
                }
            });

            return expense;
        }

        const expense = await this.prisma.month.create({
            data: 
            {
                ...dto,
                expense: {
                    create: dto.expense
                }
            },
            include: {
                expense: true,
            }
        });

        return expense;
    }

    async deleteExpense(authId: number, expenseId: number) {
        const deleteData = this.prisma.expense.delete({
            where: {
                id: expenseId, 
                userId: authId,
            }
        });

        if(!deleteData) throw new CustomException('Something went wrong!');

        return deleteData;
    }

    async completeIncomplete(authId: number, dto: StatusChangeExpenseDto) {
        let stockChange = 0;
        if(dto.isCompleted) {
            stockChange = dto.InStock + dto.remainingBalcnce;
        } else {
            stockChange = dto.InStock - dto.remainingBalcnce;
        }

        const changeStatus = await this.prisma.user.update({
            where: { id: authId },
            data: 
            {
                InStock: stockChange,
                month: {
                    update: {
                        where: {
                            id: dto.id, 
                        },
                        data: {
                            isCompleted: dto.isCompleted,
                        }
                    },
                },
            },
            include: {
                month: {
                    where: {
                        id: dto.id, 
                    },
                    select: {
                        isCompleted: true,
                    }
                },
            }
        });

        if(!changeStatus) throw new CustomException('Something went wrong!');

        const {password, name, email, id, CreatedAt, DeletedAt,  ...result} = changeStatus;
        return result;
    }
}
