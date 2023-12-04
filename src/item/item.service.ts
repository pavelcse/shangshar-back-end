import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { InsertItemDto } from './dto/item.dto';
import { UserService } from 'src/user/user.service';
import { CustomException } from 'src/CustomException/CustomException';

@Injectable()
export class ItemService {
    constructor(private prisma: PrismaService, private userService: UserService){}

    async insertItem(dto: InsertItemDto) {
        const user = await this.userService.findById(dto.userId);
    
        if(user) {
            if(dto.id) {
                const newItem = await this.prisma.item.update({
                    where: {
                        id: dto.id
                    },
                    data: dto,
                });
                return newItem;
            } else {
                delete dto.id;
                const newItem = await this.prisma.item.create({
                    data: dto,
                });
                return newItem;
            }
        }

        throw new CustomException('Something went wrong!');
    }

    async listItemsByUser(authId: number, id: number) {
        if(authId !== id) throw new UnauthorizedException("Unauthorize User");

        const allItems = await this.prisma.item.findMany({
            where: {
                userId: id,
            },
        });

        return allItems;
    }

    async deleteItem(authId: number, id: number) {
        const deleteItem = await this.prisma.item.delete({
            where: {
                id: id,
                userId: authId,
            },
        });

        if(!deleteItem) throw new CustomException('Something went wrong!');

        return deleteItem;
    }
}
