import * as passport from 'passport';
import config from './config';
import TelegramStratagy from 'passport-telegram-official';
import * as PassportJwt from 'passport-jwt';
import * as authQuery from './db/authQuery';
import CustomError from './helpers/customError';

passport.use(
  new TelegramStratagy(
    {
      botToken: config.bot_token,
    },
    async (profile, cb) => {
      try {
        const user = await authQuery.create(profile.id, {
          first_name: profile.first_name.slice(0, 32),
          last_name: profile.last_name ? profile.last_name.slice(0, 32) : null,
          telegram_id: profile.id,
          username: profile.username,
        });

        if (user.banned) {
          return cb(
            new CustomError(
              'You have been banned. Contact support for more info.'
            ),
            false
          );
        }

        return cb(null, user);
      } catch (error) {
        return cb(error, false, "Couldn't authenticate.");
      }
    }
  )
);

const jwtOptions = {
  jwtFromRequest: PassportJwt.ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwt_secret,
};

passport.use(
  new PassportJwt.Strategy(jwtOptions, async (payload, cb) => {
    try {
      const user = await authQuery.find(payload.id);
      if (!user) return cb(null, false);

      if (user.banned) {
        return cb(new Error(), false, 'You have been banned.');
      }

      return cb(null, user);
    } catch (error) {
      return cb(error, false);
    }
  })
);
