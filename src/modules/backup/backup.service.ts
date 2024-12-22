import { BadRequestException, Injectable } from '@nestjs/common';
import { backupAndReadDB } from 'src/helpers/backupAndReadDB';
import { BackupDbDto } from './dtos/backup-db.dto';

@Injectable()
export class BackupService {

    async postBackupNow({ user, password, database }: BackupDbDto) {
        try {

            const backupContent = await backupAndReadDB({
                host: 'localhost',
                user,
                password,
                database,
                outputPath: './backups',
            });

            return backupContent;
        } catch (error) {
            console.error(error.message);
            throw new BadRequestException('Error creating backup');
        }
    }
}
