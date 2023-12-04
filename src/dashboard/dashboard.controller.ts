import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('dashboard')
export class DashboardController {
    constructor(private service: DashboardService){}

    @UseGuards(JwtGuard)
    @Get(":id")
    getExpensesByUser(@Param("id") id: number) {
        return this.service.getExpensesByUser(id);
    }
}
