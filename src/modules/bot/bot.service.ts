import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class BotService implements OnApplicationBootstrap {
  private token = process.env.BOT_TOKEN;
  private bot;
  private chatId = process.env.BOT_USER_ID;

  constructor() {
    if (this.token) {
      this.bot = new TelegramBot(this.token, { polling: true });
    }
  }

  onApplicationBootstrap() {
    if (process.env.ENVIRONMENT != 'local') {
      this.sendMessage(`${process.env.ENVIRONMENT}  on`);
    }

    if (this.token) {
      this.bot = new TelegramBot(this.token, { polling: true });
      this.bot.onText(/\/echo (.+)/, (msg, match) => {
        // 'msg' is the received Message from Telegram
        // 'match' is the result of executing the regexp above on the text content
        // of the message

        const chatId = msg.chat.id;
        const resp = match[1]; // the captured "whatever"

        // send back the matched "whatever" to the chat
        this.bot.sendMessage(chatId, resp);
        // Listen for any kind of message. There are different kinds of
        // messages.
        this.bot.on('message', (msg) => {
          console.log(msg.chat.id);
          const chatId = msg.chat.id;
          // send a message to the chat acknowledging receipt of their message
          this.bot.sendMessage(chatId, 'Received your message');
        });
      });
    }
  }

  sendMessage(message: string) {
    if (this.token) {
      this.bot.sendMessage(this.chatId, message);
    } else {
      console.log('bot token not found');
    }
  }
}
