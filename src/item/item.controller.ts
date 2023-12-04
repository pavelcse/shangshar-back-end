import { Body, Request, Param, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ItemService } from './item.service';
import { InsertItemDto } from './dto/item.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('item')
export class ItemController {
    constructor(private itemService: ItemService){}

    @UseGuards(JwtGuard)
    @Post('add')
    async add(@Body() dto: InsertItemDto) {
        return this.itemService.insertItem(dto);
    }

    @UseGuards(JwtGuard)
    @Get(":id")
    async list(@Request() req: any, @Param("id") id: number) {
        return this.itemService.listItemsByUser(req.user.id, id);
    }

    @UseGuards(JwtGuard)
    @Get("delete/:id")
    async delete(@Request() req: any, @Param("id") id: number) {
        console.log(555);
        return this.itemService.deleteItem(req.user.id, id);
    }
}
