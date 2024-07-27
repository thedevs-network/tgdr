import { ContextMessageUpdate } from "telegraf";
import * as entryQuery from '../db/entryQuery';

export const report = async (ctx: ContextMessageUpdate, next) => {
  const username = ctx.update.callback_query.message.text
    .toString().match(/(@.*)/m)[1].replace("\\n", "").replace("@", "");
  
  if (!username) {
    await ctx.reply("❌ Could not extract the username.");
    return;
  }

  const isDelete = ctx.update.callback_query.data === 'delete';
  if (isDelete) {
    await entryQuery.deleteOne({ username });
    await ctx.deleteMessage();
  }

  const isReject = ctx.update.callback_query.data.includes('reject');
  if (isReject) {
    let reject_reason;
    
    switch (ctx.update.callback_query.data) {
      case 'reject_language':
        reject_reason = 'Not English'
        break;
      case 'reject_spam':
        reject_reason = 'Spam/Scam'
        break;
      case 'reject_crypto':
        reject_reason = 'Crypto'
        break;
      case 'reject_adult_content':
        reject_reason = 'Adult Content'
        break;
    
      default:
        break;
    }

    const update = {
      status: "rejected",
      ...(reject_reason && ({ reject_reason }))
    }

    await entryQuery.update(username, update, true);
    await ctx.deleteMessage();
  }
  
  return next();
};
