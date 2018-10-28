import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as reviewController from '../controllers/reviewController';
import { reviewValidator } from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  reviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(reviewController.create),
)

export default router;
