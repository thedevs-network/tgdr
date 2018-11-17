import Telegraf from 'telegraf';
import config from '../config';
import asyncHandler from './asyncHandler';
import * as middlewares from './middlewares';
import * as commands from './commands';

const bot = new Telegraf(config.bot_token);

bot.use(asyncHandler(middlewares.adminAuth));
bot.use(asyncHandler(middlewares.setCommandingFlag(true)));
bot.command('ban', asyncHandler(commands.ban));
bot.command('unban', asyncHandler(commands.unban));
bot.use(asyncHandler(middlewares.setCommandingFlag(false)));

bot.startPolling();

export default bot;