import { ContextMessageUpdate } from 'telegraf';
import * as Markup from 'telegraf/markup';
import { Types } from 'mongoose';
import * as R from 'ramda';
import * as redis from '../redis';
import * as authQuery from '../db/authQuery';
import * as entryQuery from '../db/entryQuery';
import * as reviewQuery from '../db/reviewQuery';
import { getDbName, getEntryFeedback, getScore } from '../utils';
import { sendUserSpamReport } from '../controllers/botController';
import { IEntrySchema } from '../models/Entry';

interface IRate {
  disliked?: boolean;
  entry?: IEntrySchema;
  liked?: boolean;
  start?: boolean;
  text?: string;
  username?: string;
}

export const init = async (ctx: ContextMessageUpdate, username: string) => {
  const { id } = ctx.from;

  const entry = await entryQuery.findOne({
    status: 'active',
    username,
  });

  if (!entry) {
    return ctx.replyWithHTML(
      `<code>@${username}</code> does not exist in our database.\n\n` +
        'You can submit it here:\n' +
        '🌐 https://tgdr.io'
    );
  }

  const userState = {
    rate: { entry, username },
  };

  await redis.set(getDbName(id), JSON.stringify(userState), 'EX', 60 * 60);

  return ctx.replyWithHTML(
    `You are going to rate the <code>@${username}</code>.\n\n` +
      'Please select your feedback.',
    Markup.keyboard([['💙', '👎']])
      .oneTime()
      .resize()
      .extra()
  );
}

export const start = async (ctx: ContextMessageUpdate) => {
  const { id } = ctx.from;

  const userState = {
    rate: { start: true },
  };

  await redis.set(getDbName(id), JSON.stringify(userState), 'EX', 60 * 60);

  return ctx.replyWithHTML(
    'Please enter the username of an entry.\n\n' + 'e.g. <code>@tgdr_io</code>'
  );
};

export const likeDislike = async (ctx: ContextMessageUpdate) => {
  const { id } = ctx.from;
  const { text } = ctx.message;
  const cachedState = await redis.get(getDbName(id));
  const state = cachedState && JSON.parse(cachedState);
  const username: string = R.path(['rate', 'username'], state);

  if (!username) {
    return ctx.reply('Please use /rate command to choose an entry first.');
  }

  const liked = text === '💙';
  const disliked = text === '👎';

  const userState: { rate: IRate } = {
    rate: {
      ...state.rate,
      disliked,
      liked,
    },
  };

  await redis.set(getDbName(id), JSON.stringify(userState), 'EX', 60 * 60);

  return ctx.reply(
    'Write a feedback or review (min 20 chars).\n\n' +
      'You can /skip this part.'
  );
};

export const submit = async ctx => {
  const { id } = ctx.from;
  const cachedState = await redis.get(getDbName(id));
  const state = cachedState && JSON.parse(cachedState);
  const rate: IRate = R.path(['rate'], state);

  if (!rate || !rate.username || typeof rate.liked !== 'boolean') {
    return ctx.reply('ℹ️ Please use /rate command to choose an entry first.');
  }

  const { entry, liked, disliked, text, username } = rate;

  if (liked === disliked) {
    return ctx.reply('❌ An error occurred.');
  }

  const review = await reviewQuery.findOne({
    entry: Types.ObjectId(entry._id.toString()),
    user: Types.ObjectId(ctx.state.user._id.toString()),
  });

  await reviewQuery.create({
    created_at: new Date(),
    disliked: !!disliked,
    entry: Types.ObjectId(entry._id),
    liked: !!liked,
    text,
    user: Types.ObjectId(ctx.state.user._id),
  });

  if (!(review.liked === !!liked && review.disliked === !!disliked)) {
    const feedbacks = getEntryFeedback(review, disliked, liked);
    const score = getScore(entry, feedbacks);
    await entryQuery.update(username, { ...feedbacks, score });
    const updatedUser = await authQuery.updateLikes(
      ctx.state.user.telegram_id,
      feedbacks
    );
    sendUserSpamReport(updatedUser);
  }

  await redis.del(getDbName(id));

  return ctx.reply(
    '✅ Review has been submitted successfully!\n\n' +
      'Check your review here:' +
      `https://tgdr.io/@${username}`
  );
};

export const reviewText = async (ctx, next) => {
  const { id } = ctx.from;
  const { text } = ctx.message;
  const cachedState = await redis.get(getDbName(id));
  const state = cachedState && JSON.parse(cachedState);
  const rate: IRate = R.path(['rate'], state);

  if (!rate) return next();

  // Start the first step if message is a username
  if (rate.start && !rate.username) {
    const username = ctx.message.text.trim().replace('@', '');

    if (!username) {
      return ctx.reply('ℹ️ Please enter a username.');
    }
    
    return init(ctx, username);
  }

  if (!rate.username || typeof rate.liked !== 'boolean') return next();
  
  // If is not a username, then consider it as review text
  if (text.length < 20 || text.length > 400) {
    return ctx.reply('ℹ️ Review text must be between 20 and 400 chars.');
  }

  const userState = {
    rate: {
      ...rate,
      text: ctx.message.text,
    },
  };

  await redis.set(getDbName(id), JSON.stringify(userState), 'EX', 60 * 60);
  return submit(ctx);
};
