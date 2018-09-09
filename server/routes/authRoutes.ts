import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as authController from '../controllers/authController';

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('telegram', { session: false }),
  asyncHandler(authController.login)
);

router.post(
  '/renew',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(authController.renew)
);

export default router;
