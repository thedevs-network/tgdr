import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as tagsController from '../controllers/tagsController';

const router = express.Router();

router.get('/', asyncHandler(tagsController.getTags));

router.get('/tags');

export default router;
