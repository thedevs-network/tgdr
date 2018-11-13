import { ContextMessageUpdate } from 'telegraf';
import * as authQuery from '../db/authQuery';
import * as entryQuery from '../db/entryQuery';
import * as reviewQuery from '../db/reviewQuery';
import { getEntryRemoveFeedback, getScore } from '../utils';

export const ban = async (ctx: ContextMessageUpdate, next) => {
  const [id] = ctx.message.text
    .trim()
    .split(' ')
    .reverse();
  const telegram_id = Number(id);

  if (!id) {
    return ctx.reply('Need a review ID or telegram ID.');
  }

  let user;

  if (Number.isNaN(telegram_id)) {
    const review = await reviewQuery.findById(id).populate('user');
    user = review.user;
  } else {
    user = await authQuery.find(telegram_id);
  }

  if (!user) {
    return ctx.reply("Couldn't find user.");
  }

  await authQuery.create(user.telegram_id, { banned: true });

  const reviews = await reviewQuery.find({ user }).lean();

  await Promise.all(
    reviews.map(async review => {
      const entry = await entryQuery.findById(review.entry);
      const feedbacks = getEntryRemoveFeedback(review);
      const score = getScore(entry, feedbacks);
      await entryQuery.update(entry.username, { ...feedbacks, score });
      await reviewQuery.remove(review);
    })
  );

  ctx.reply('✅ User has been banned.');

  return next();
};
