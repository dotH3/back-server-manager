import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { IsLoggedGuard } from 'src/guards/is-logged.guard';
import { BackupDbDto } from './dtos/backup-db.dto';

@Controller('server-manager/backup')
export class BackupController {
    constructor(private readonly BackupService: BackupService) { }
    @Post("")
    @UseGuards(IsLoggedGuard)
    async getBackupNow(@Body() body: BackupDbDto) {
        return this.BackupService.postBackupNow(body);
    }

}
