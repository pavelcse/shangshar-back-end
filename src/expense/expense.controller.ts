import { Body, Controller, Param, Post, Request, UseGuards, Get } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ListExpenseDto } from './dto/listExpense.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AddExpenseDto } from './dto/addExpense.dto';
import { StatusChangeExpenseDto } from './dto/statusChangeExpense.dto';

@Controller('expense')
export class ExpenseController {
    constructor(private expenseService: ExpenseService){}

    @UseGuards(JwtGuard)
    @Post('items')
    async getExpenses(@Request() req: any, @Body() dto: ListExpenseDto) {
        return this.expenseService.getExpenseByUserAndMonth(req.user.id, dto);
    }

    @UseGuards(JwtGuard)
    @Post('add')
    async addExpense(@Request() req: any, @Body() dto: AddExpenseDto) {
        return this.expenseService.addExpense(req.user.id, dto);
    }

    @UseGuards(JwtGuard)
    @Get(':id')
    async deleteExpense(@Request() req: any, @Param("id") id: number) {
        return this.expenseService.deleteExpense(req.user.id, id);
    }

    @UseGuards(JwtGuard)
    @Post('complete-incomplete')
    async completeIncomplete(@Request() req: any, @Body() dto: StatusChangeExpenseDto) {
        return this.expenseService.completeIncomplete(req.user.id, dto);
    }
}
