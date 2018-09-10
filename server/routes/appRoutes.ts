import * as express from 'express';
import * as next from 'next';
import * as appController from '../controllers/appController';

const router = express.Router();

const appRouter = (app: next.Server) => {
  router.get('/', appController.renderHomepage(app));

  return router;
};

export default appRouter;
