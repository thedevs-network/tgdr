import * as redis from '../redis';
import * as authQuery from '../db/authQuery';
import { getDbName, isAdmin } from '../utils';
import { ContextMessageUpdate } from 'telegraf';

export const onlyPrivate = async (ctx: ContextMessageUpdate, next) =>
  ctx.chat.type === 'private' ? next() : null;

export const clear = async (ctx: ContextMessageUpdate, next) => {
  const { id } = ctx.from;
  await redis.del(getDbName(id));
  next();
};

export const register = async (ctx, next) => {
  const { id, is_bot, first_name, last_name, username } = ctx.from;

  if (is_bot) return null;

  const telegram_id = Number(id);

  const user = await authQuery.create(telegram_id, {
    first_name: first_name.slice(0, 32),
    last_name: last_name ? last_name.slice(0, 32) : null,
    telegram_id,
    username,
  });

  if (user.banned) {
    return ctx.reply('❌ You have been banned. Contact support for more info.');
  }

  ctx.state.user = user;

  next();
};

export const authAdmin = async (ctx, next) => {
  if (ctx.state.isAdmin) next();
  return null;
};

export const adminCheck = async (ctx, next) => {
  const id = Number(ctx.from.id);
  if (isAdmin(id)) {
    ctx.state.isAdmin = true;
    const admin = await authQuery.find(id);
    if (admin.commanding) return null;
  }
  next();
};

export const setCommandingFlag = (status: boolean) => async (ctx, next) => {
  const id = Number(ctx.from.id);
  await authQuery.create(id, { commanding: status });
  if (status) next();
};
