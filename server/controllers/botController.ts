import * as express from 'express';
import axios from 'axios';
import * as differenceInHours from 'date-fns/difference_in_hours';
import bot, { bot2 } from '../bot';
import * as cheerio from 'cheerio';
import * as authQuery from '../db/authQuery';
import config from '../config';
import CustomError from '../helpers/customError';
import { IUserModel } from '../models/User';
import { getReportChat } from '../utils';

export const getChatMembers = async (username: string) =>
  bot2.telegram.getChatMembersCount(`@${username}`);

export const getChatDetails = async (username: string) => {
  username = `@${username}`;

  try {
    const [details, members] = await Promise.all([
      bot.telegram.getChat(username),
      bot.telegram.getChatMembersCount(username),
    ]);

    if (!details.photo) {
      return { ...details, members };
    }

    // @ts-ignore
    const { file_path } = await bot.telegram.getFile(
      details.photo.small_file_id
    );

    const image = `https://api.telegram.org/file/bot${
      config.bot_token
    }/${file_path}`;

    return { ...details, image, members };
  } catch (error) {
    const message =
      error.code === 400
        ? 'Chat not found.'
        : 'An error occurred. Try again later.';

    throw new CustomError(message);
  }
};

export const getBotDetails = async (username: string) => {
  const { data } = await axios.get(`https://t.me/${username}`);
  const $ = cheerio.load(data);
  const botUsername = $('.tgme_page_extra').text();
  const img = $('.tgme_page_photo_image').attr('src');

  if (!botUsername) {
    throw new CustomError('Bot not found.');
  }

  return {
    id: null,
    image: img,
    type: 'bot',
  };
};

export const sendReport: express.RequestHandler = async (req, res) => {
  const {
    entry: { username },
    review,
  } = res.locals;
  const { info, reason } = req.body;
  const { first_name, last_name, telegram_id } = req.user;

  const title = '⚠️ <b>Report:</b>\n\n';
  const usernameText = `<b>Entry:</b>\n@${username}\n\n`;
  const reasonText = `<b>Reason:</b>\n<code>${reason}</code>\n\n`;
  const infoText = info ? `<b>Info:</b>\n<code>${info}</code>\n\n` : '';
  const reviewText = review
    ? `<b>Review:</b>\n<code>${review.text}</code>\n\n`
    : '';
  const userUsername = req.user.username ? `-  @${req.user.username}` : '';
  const userText =
    `<b>By:</b>\n<code>${telegram_id} - ` +
    `${first_name} ${last_name || ''} ${userUsername}</code>`;

  const text =
    title + usernameText + reasonText + infoText + reviewText + userText;

  await bot.telegram.sendMessage(getReportChat(), text, {
    // @ts-ignore
    parse_mode: 'HTML',
  });

  return res
    .status(200)
    .json({ message: 'Report has been sent successfully.' });
};

export const sendUserSpamReport = async (user: IUserModel) => {
  const { likes, dislikes, spamReportDate } = user;

  // If last report was sent recently and within last 48 hours
  // Then do not send report again
  if (spamReportDate) {
    const sinceLastReport = differenceInHours(new Date(), spamReportDate);
    if (sinceLastReport < 48) return;
  }

  // If user dislike ratio is not suspicious enough
  // Then do not send report
  const dislikePercent =
    likes + dislikes > 0 ? (dislikes / (likes + dislikes)) * 100 : 0;
  if (dislikes < 10 || dislikePercent < 80) return;

  const title = '⛔️ <b>Suspicious user activity:</b>\n\n';
  const dislikesText = `<b>Dislikes:</b>\n<code>${dislikes}</code>\n\n`;
  const likesText = `<b>Likes:</b>\n<code>${likes}</code>\n\n`;
  const username = user.username ? `-  @${user.username}` : '';
  const userText =
    `<b>User:</b>\n<code>${user.telegram_id} - ` +
    `${user.first_name} ${user.last_name || ''} ${username}</code>`;

  const text = title + dislikesText + likesText + userText;

  await authQuery.create(user.telegram_id, { spamReportDate: new Date() });

  await bot.telegram.sendMessage(getReportChat(), text, {
    // @ts-ignore
    parse_mode: 'HTML',
  });

  return;
};


export const sendNewEntry: express.RequestHandler = async (req, res) => {
  const {
    entry,
  } = res.locals;
  const { first_name, last_name, telegram_id } = req.user;

  const title = '✅ <b>Entry submitted:</b>\n\n';
  const entryUsername = `<b>Entry:</b>\n@${entry.username}\n\n`;
  const entryTitle = `<b>Title:</b>\n<code>${entry.title}</code>\n\n`;
  const entryType = `<b>Type:</b>\n<code>${entry.type}</code>\n\n`;
  const entryCategory = `<b>Category:</b>\n<code>${entry.category}</code>\n\n`;
  const userUsername = req.user.username ? `-  @${req.user.username}` : '';
  const userText =
    `<b>By:</b>\n<code>${telegram_id} - ` +
    `${first_name} ${last_name || ''} ${userUsername}</code>`;

  const text =
    title + entryUsername + entryTitle + entryType + entryCategory + userText;

  await bot.telegram.sendMessage(getReportChat(), text, {
    // @ts-ignore
    parse_mode: 'HTML',
  });

  return res
    .status(201)
    .json({ message: 'Entry has been submitted successfully.' });
};
