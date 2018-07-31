import * as passport from 'passport';
import config from './config';
import TelegramStratagy from 'passport-telegram-official';

passport.use(new TelegramStratagy({
  botToken: config.bot_token,
}, (profile, cb) => {
  return cb(null, profile);
}));