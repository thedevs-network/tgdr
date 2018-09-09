import * as express from 'express';
import * as passport from 'passport';
import * as asyncHandler from 'express-async-handler';
import * as entryController from '../controllers/entryController';
import { entryValidators } from '../utils/validators';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/submit',
  entryValidators,
  asyncHandler(validatorsController.entry),
  passport.authenticate('jwt', { session: false }),
  asyncHandler(entryController.checkExistence),
  asyncHandler(entryController.getDetails),
  asyncHandler(entryController.downloadImage),
  asyncHandler(entryController.createEntry)
);

router.get('/tags', asyncHandler(entryController.getTags));

export default router;
