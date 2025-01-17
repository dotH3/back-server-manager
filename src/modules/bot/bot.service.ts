import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnApplicationBootstrap {
  private token = process.env.BOT_TOKEN;
  private bot;
  private chatId = process.env.BOT_USER_ID;

  constructor() {
    if (this.token) {
      // Crea la instancia del bot solo una vez en el constructor
      this.bot = new TelegramBot(this.token, { polling: true });
    }
  }

  onApplicationBootstrap() {
    if (process.env.ENVIRONMENT != 'local') {
      this.sendMessage(`crons on`);
    }

    if (this.bot) {
      // Definir el comportamiento del bot en onApplicationBootstrap
      this.bot.onText(/\/echo (.+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const resp = match[1]; // El texto que el usuario quiere repetir
        this.bot.sendMessage(chatId, resp);
      });

      this.bot.on('message', (msg) => {
        console.log(msg.chat.id);
        const chatId = msg.chat.id;
        this.bot.sendMessage(chatId, 'Received your message');
      });
    }
  }

  sendMessage(message: string) {
    if (this.bot && this.chatId) {
      this.bot.sendMessage(this.chatId, message);
    } else {
      console.log('Bot token or chat ID not found');
    }
  }
}
