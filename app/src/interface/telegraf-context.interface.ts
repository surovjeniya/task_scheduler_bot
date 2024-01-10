import { Context } from 'telegraf';
import {
  Contact,
  Message,
  PhotoSize,
  Update,
  Voice,
} from 'telegraf/typings/core/types/typegram';

export interface TelegrafContext extends Context {
  session: {
    action: 'create_task' | null;
    priority: 'high' | 'low' | 'medium';
    text: string;
  };
  update: Update & {
    message: Message & {
      text?: string;
      contact?: Contact;
      voice?: Voice;
      photo?: PhotoSize;
    };
  };
}
