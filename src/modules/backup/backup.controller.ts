import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { BackupService } from './backup.service';
import { IsLoggedGuard } from 'src/guards/is-logged.guard';
import { BackupDbDto } from './dtos/backup-db.dto';
import { Request } from 'express';

@Controller('server-manager/backup')
export class BackupController {
    constructor(private readonly BackupService: BackupService) { }
    @Post("")
    @UseGuards(IsLoggedGuard)
    async getBackupNow(@Body() body: BackupDbDto, @Req() request:Request) {
        return this.BackupService.postBackupNow(body,request);
    }

}
