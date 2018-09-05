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
  const img = $('.tgme_page_photo_image').attr('src');
  return {
    image: img,
  };
};
