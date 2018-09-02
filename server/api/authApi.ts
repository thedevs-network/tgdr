import * as express from 'express';
import * as passport from 'passport';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('telegram', { session: false }),
  authController.login);

router.post(
  '/renew',
  passport.authenticate('jwt', { session: false }),
  authController.renew,
);

export default router;