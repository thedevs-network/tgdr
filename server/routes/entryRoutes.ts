import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as entryController from '../controllers/entryController';
import { entryValidator, newEntryValidators } from '../utils';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/submit',
  passport.authenticate('jwt', { session: false }),
  newEntryValidators,
  asyncHandler(validatorsController.entry),
  asyncHandler(entryController.checkExistence),
  asyncHandler(entryController.getDetails),
  asyncHandler(entryController.downloadImage),
  asyncHandler(entryController.createEntry)
);

router.get('/', asyncHandler(entryController.getEntries));

router.get(
  '/:username',
  entryValidator,
  asyncHandler(validatorsController.entry),
  asyncHandler(entryController.getEntry)
);

export default router;
