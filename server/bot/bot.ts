import Telegraf from 'telegraf';
import config from '../config';
import asyncHandler from './asyncHandler';
import * as auth from './auth';
import * as commands from './commands';

const bot = new Telegraf(config.bot_token);

bot.use(asyncHandler(auth.register));
bot.use(asyncHandler(auth.adminCheck));
bot.use(asyncHandler(auth.setCommandingFlag(true)));
bot.command('ban', auth.authAdmin, asyncHandler(commands.ban));
bot.command('unban', auth.authAdmin, asyncHandler(commands.unban));
bot.use(asyncHandler(auth.setCommandingFlag(false)));

bot.startPolling();

export default bot;
