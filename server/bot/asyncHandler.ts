import { ContextMessageUpdate } from 'telegraf';

const asyncHandler = (fn: (ctx: ContextMessageUpdate, next?: any) => any) => (
  ctx: ContextMessageUpdate,
  next
) => fn(ctx, next).catch(() => ctx.reply('❌ An error occurred.'));

export default asyncHandler;
