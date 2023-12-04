import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [ExpenseService, PrismaService, JwtService],
  controllers: [ExpenseController]
})
export class ExpenseModule {}
