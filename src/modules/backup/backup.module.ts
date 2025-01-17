import { Module } from '@nestjs/common';
import { BackupController } from './backup.controller';
import { BackupService } from './backup.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { BotService } from '../bot/bot.service';
import { BotModule } from '../bot/bot.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User
    ]),
    BotModule
  ],
  controllers: [BackupController],
  providers: [BackupService]
})
export class BackupModule { }
