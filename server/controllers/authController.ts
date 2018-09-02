import * as express from 'express';
import * as JWT from 'jsonwebtoken';
import config from '../config';
import { IUserModel } from '../models/User';

/* Generate JWT */
const signToken = (user: IUserModel) =>
  JWT.sign(
    {
      exp: new Date().setDate(new Date().getDate() + 7),
      iat: new Date().getTime(),
      id: user.telegram_id,
      name: user.first_name,
    },
    config.jwt_secret
  );

export const login = (req: express.Request, res: express.Response) => {
  const jwt = signToken(req.user);
  res.status(200).json({ token: jwt });
};

export const renew = (req: express.Request, res: express.Response) => {
  const jwt = signToken(req.user);
  res.status(200).json({ token: jwt });
};