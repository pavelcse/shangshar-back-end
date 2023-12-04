import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateLoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService){}

    async login(dto: CreateLoginDto){
        const user = await this.validateUser(dto);
        const payload = {
            id: user.id,
            username: user.email,
            sub: {
                id: user.id,
                name: user.name,
            },
        };

        return {
            user, 
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h', // 1h
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            },
        };
    }

    async validateUser(dto: CreateLoginDto){
        const user = await this.userService.findByEmail(dto.username);

        if (user && (await compare(dto.password, user.password))) {
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async refreshToken(user: any) {
        const payload = {
            id: user.id,
            username: user.username,
            sub: user.sub,
        };

        return {
            accessToken: await this.jwtService.signAsync(payload, {
                expiresIn: '1h', // 1h
                secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
                expiresIn: '7d',
                secret: process.env.jwtRefreshTokenKey,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        }
    }
}
