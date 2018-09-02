import * as express from 'express';
import * as passport from 'passport';
import * as entryController from '../controllers/entryController';
import { entryValidators } from '../utils/validators';
import * as validatorsController from '../controllers/validatorsController';

const router = express.Router();

router.post(
  '/submit',
  entryValidators,
  validatorsController.entry,
  passport.authenticate('jwt', { session: false }),
  entryController.getDetails,
  entryController.downloadImage,
);

export default router;