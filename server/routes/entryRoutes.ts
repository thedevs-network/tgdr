import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as authController from '../controllers/authController';
import * as botController from '../controllers/botController';
import * as entryController from '../controllers/entryController';
import * as reviewController from '../controllers/reviewController';
import {
  entriesValidator,
  entryValidator,
  newEntryValidators,
  reportValidator,
} from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  newEntryValidators,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.checkExistence),
  asyncHandler(entryController.getDetails),
  asyncHandler(entryController.downloadImage),
  asyncHandler(entryController.create),
  asyncHandler(botController.sendNewEntry),
);

router.put(
  '/',
  passport.authenticate('jwt', { session: false }),
  asyncHandler(authController.adminCheck),
  newEntryValidators,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.getDetails),
  asyncHandler(entryController.downloadImage),
  asyncHandler(entryController.update)
);

router.get('/', entriesValidator, asyncHandler(entryController.get));

router.get(
  '/:username',
  authController.optionalJwt,
  entryValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReview),
  asyncHandler(entryController.getSingle)
);

router.post(
  '/report',
  passport.authenticate('jwt', { session: false }),
  reportValidator,
  asyncHandler(validatorsController.checkForErrors),
  asyncHandler(entryController.withEntry),
  asyncHandler(reviewController.withReviewById),
  asyncHandler(botController.sendReport)
);

export default router;
