import * as Telegraf from 'telegraf';
import config from '../config';

const bot = new Telegraf(config.bot_token);

bot.startPolling();

export default bot;