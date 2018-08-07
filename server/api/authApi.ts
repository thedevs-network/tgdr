import * as express from 'express';
import * as passport from 'passport';
import { loginHandler, renewHandler } from '../controllers/authController';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('telegram', { session: false }),
  loginHandler);

router.post(
  '/renew',
  passport.authenticate('jwt', { session: false }),
  renewHandler,
);

export default router;