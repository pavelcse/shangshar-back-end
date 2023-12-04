import { Injectable } from '@nestjs/common';
import { CustomException } from 'src/CustomException/CustomException';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DashboardService {
    constructor(private prisma: PrismaService){}

    getExpensesByUser(id: number) {
        const expenses = this.prisma.month.findMany({
            where: {
                userId: id
            },
            include: {
                user: {
                    select: {
                        InStock: true,
                    }
                },
                expense: true,
            }
        });

        if(!expenses) throw new CustomException("Something went wrong!");
        return expenses;
    }
}
