import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as reviewController from '../controllers/reviewController';
import * as entryController from '../controllers/entryController';
import { entryValidator, reviewValidator } from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.get(
  '/:username',
  entryValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.get)
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  reviewValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(validatorsController.createReview),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReview),
  asyncHandler(reviewController.create)
);

router.delete(
  '/:username',
  passport.authenticate('jwt', { session: false }),
  entryValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReview),
  asyncHandler(reviewController.remove)
);

export default router;
