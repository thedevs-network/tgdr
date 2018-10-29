import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as reviewController from '../controllers/reviewController';
import { removeReviewValidator, reviewValidator } from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  reviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(reviewController.create)
);

router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  removeReviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(reviewController.remove)
);

export default router;
