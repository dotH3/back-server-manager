import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BackupModule } from './modules/backup/backup.module';
import { IdkModule } from './modules/idk/idk.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import * as dotenv from 'dotenv'
import { BotModule } from './modules/bot/bot.module';

dotenv.config();

const username = process.env.DB_USER || 'root';
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST || 'localhost';
const port = Number(process.env.DB_PORT) || 3306;
const database = process.env.DB_NAME || 'server-manager';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host,
      port,
      username,
      password,
      database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BackupModule,
    IdkModule,
    UserModule,
    AuthModule,
    BotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }