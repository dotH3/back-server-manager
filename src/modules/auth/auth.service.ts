import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { LoginUserDto } from './dtos/login-user.dto';
import { createJwt } from 'src/helpers/createJwt';
import { devLog } from 'src/helpers/devLog';


@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async loginUser({ username, password }: LoginUserDto) {
        try {
            const user = await this.userRepository.findOne({
                where: { username },
                select: ['password', 'username', 'id'],
            });

            if (!user) throw new NotFoundException('Usuario no encontrado');

            const passwordDecode = bcryptjs.compareSync(password, user.password);
            if (!passwordDecode)
                throw new BadRequestException('Usuario o contraseña incorrectos');

            delete user.password;
            devLog(`login ${user.username}#${user.id}`, 'SECURITY');
            const token = await createJwt({ ...user, active: true });
            return token
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error.message);
        }
    }
}
