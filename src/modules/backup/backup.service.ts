import { BadRequestException, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { backupAndReadDB } from 'src/helpers/backupAndReadDB';
import { BotService } from '../bot/bot.service';
import { BackupDbDto } from './dtos/backup-db.dto';

@Injectable()
export class BackupService {
  constructor(private botService: BotService) {}

  async postBackupNow(
    { user, password, database, host }: BackupDbDto,
    request: Request
  ) {
    try {
      const backupContent = await backupAndReadDB({
        host,
        user,
        password,
        database,
        outputPath: './backups',
      });

      this.botService.sendMessage(`Backup creado ${database} ${request.ip}`);
      return backupContent;
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Error creating backup');
    }
  }
}
