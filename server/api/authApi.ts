import * as express from 'express';
import * as passport from 'passport';
import { loginHandler } from '../controllers/authController';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('telegram', { session: false }),
  loginHandler);

export default router;