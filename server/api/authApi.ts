import * as express from 'express';
import * as passport from 'passport';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('telegram'));

export default router;