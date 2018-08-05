import * as passport from 'passport';
import config from './config';
import TelegramStratagy from 'passport-telegram-official';
import User from './models/User';

passport.use(new TelegramStratagy({
  botToken: config.bot_token,
}, async (profile, cb) => {
  try {
    const user = await User.findOneAndUpdate(
      { telegram_id: profile.id },
      {
        first_name: profile.first_name.slice(0, 32),
        telegram_id: profile.id,
        username: profile.username
      }, {
        new: true,
        upsert: true,
      }
    );
    return cb(null, user);
  } catch (error) {
    return cb(error, false, "Couldn't authenticate.");
  }
}));