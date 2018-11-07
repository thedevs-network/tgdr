import * as express from 'express';
import * as JWT from 'jsonwebtoken';
import * as passport from 'passport';
import config from '../config';
import { IUserModel } from '../models/User';
import { isAdmin } from '../utils';

/* Generate JWT */
const signToken = (user: IUserModel, admin: boolean) =>
  JWT.sign(
    {
      admin,
      exp: new Date().setDate(new Date().getDate() + 7),
      iat: new Date().getTime(),
      id: user.telegram_id,
      name: user.first_name,
    },
    config.jwt_secret
  );

export const optionalJwt = (req, res, next) => {
  passport.authenticate('jwt', (err, user) => {
    if (err) return next(err);
    if (!user) return next(err);
    req.user = user;
    next();
  })(req, res, next);
};

export const adminCheck: express.RequestHandler = async (req, res, next) => {
  if (!isAdmin(req.user.telegram_id)) {
    return res.status(401).json({ error: 'Unauthorized.' });
  }
  req.user.isAdmin = true;
  return next();
};

export const login: express.RequestHandler = async (req, res) => {
  const jwt = signToken(req.user, isAdmin(req.user.telegram_id));
  res.status(200).json({ token: jwt });
};

export const renew: express.RequestHandler = async (req, res) => {
  const jwt = signToken(req.user, isAdmin(req.user.telegram_id));
  res.status(200).json({ token: jwt });
};
