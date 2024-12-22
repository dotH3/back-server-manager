import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { generateAndHashPassword } from 'src/helpers/generateAndHashPassword';
import { devLog } from 'src/helpers/devLog';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User)
    private userRepository: Repository<User>,) { }
    async onModuleInit() {
        devLog("Inicializando Accesos", 'SECURITY');

        const adminExists = await this.userRepository.findOne({ where: { username: 'admin' } });
        if (!adminExists) {
            const { rawPassword, hashPassword } = generateAndHashPassword();
            const adminUser = this.userRepository.create({
                username: 'admin',
                password: hashPassword,
            });
            await this.userRepository.save(adminUser);
            devLog(`Admin user created with password: ${rawPassword}`, 'SECURITY');
        } else {
        }
    }
}