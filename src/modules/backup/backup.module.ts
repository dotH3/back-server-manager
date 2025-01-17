import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { BotService } from '../bot/bot.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
  ],
  controllers: [BackupController],
  providers: [BackupService,BotService]
})
export class BackupModule { }
