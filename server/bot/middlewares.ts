import { ContextMessageUpdate } from 'telegraf';
import * as authQuery from '../db/authQuery';
import { isAdmin } from '../utils';

export const adminAuth = async (ctx: ContextMessageUpdate, next) => {
  const id = Number(ctx.from.id);
  if (!isAdmin(id)) return null;
  const admin = await authQuery.find(id);
  if (admin.commanding) return null;
  next();
};

export const setCommandingFlag = (status: boolean) => async (
  ctx: ContextMessageUpdate,
  next
) => {
  const id = Number(ctx.from.id);
  if (!isAdmin(id)) return next();
  await authQuery.create(id, { commanding: status });
  next();
};
