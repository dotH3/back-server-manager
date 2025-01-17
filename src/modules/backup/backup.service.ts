import { BadRequestException, Injectable } from '@nestjs/common';
import { backupAndReadDB } from 'src/helpers/backupAndReadDB';
import { BackupDbDto } from './dtos/backup-db.dto';
import { BotService } from '../bot/bot.service';
import { Request } from 'express';

@Injectable()
export class BackupService {

    constructor(private botService: BotService,){}

    async postBackupNow({ user, password, database }: BackupDbDto,request:Request) {
        try {

            const backupContent = await backupAndReadDB({
                host: 'localhost',
                user,
                password,
                database,
                outputPath: './backups',
            });

            this.botService.sendMessage(`Backup creado ${database} ${request.ip}`)
            return backupContent;
        } catch (error) {
            console.error(error.message);
            throw new BadRequestException('Error creating backup');
        }
    }
}
