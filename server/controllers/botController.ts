import * as express from 'express';
import axios from 'axios';
import bot from '../bot';
import * as cheerio from 'cheerio';
import config from '../config';
import CustomError from '../helpers/customError';

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

  if (img) {
    return {
      image: img,
    };
  }
};

export const sendReport: express.RequestHandler = async (req, res) => {
  const {
    entry: { username },
    review,
  } = res.locals;
  const { info, reason } = req.body;
  const { first_name, telegram_id } = req.user;

  const usernameText = `<b>Entry:</b>\n@${username}\n\n`;
  const reasonText = `<b>Reason:</b>\n<code>${reason}</code>\n\n`;
  const infoText = info ? `<b>Info:</b>\n<code>${info}</code>\n\n` : '';
  const reviewText = review
    ? `<b>Review:</b>\n<code>${review.text}</code>\n\n`
    : '';
  const userText = `<b>By:</b>\n<code>${telegram_id} - ${first_name}</code>`;

  const text = usernameText + reasonText + infoText + reviewText + userText;

  await bot.telegram.sendMessage(config.admin_id, text, {
    parse_mode: 'HTML',
  });

  return res
    .status(200)
    .json({ message: 'Report has been sent successfully.' });
};
