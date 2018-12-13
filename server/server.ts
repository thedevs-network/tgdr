import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import config from './config';
import authRoutes from './routes/authRoutes';
import entryRoutes from './routes/entryRoutes';
import reviewRoutes from './routes/reviewRoutes';
import tagsRoutes from './routes/tagsRoutes';
import appRoutes from './routes/appRoutes';
import * as errorController from './controllers/errorController';
import createReadStream from 'fs';

// Import Telegram bot
import './bot';

// Import passport strategies
import './passport';

// Import cron jobs
import './cron';

const app = next({ dev: config.is_dev });
const handle = app.getRequestHandler();
mongoose.connect(config.db_uri);

app.prepare().then(() => {
  const server: express.Application = express();

  // Use helmet to secure app with HTTP headers
  server.use(helmet());

  // Use morgan to log requests for dev
  if (config.is_dev) {
    server.use(morgan('dev'));
  }

  // Parse body and form data
  server.use(cookieParser());
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));

  // Initialize passport
  server.use(passport.initialize());

  // Serve static files inside static folder
  server.use(express.static('static'));

  // API
  server.use('/api/auth', authRoutes);
  server.use('/api/entry', entryRoutes);
  server.use('/api/review', reviewRoutes);
  server.use('/api/tags', tagsRoutes);
  server.use('/api', errorController.notFound);
  server.use('/', appRoutes(app));
  server.use(errorController.send);

  server.get('/sw.js', (req,res) =>{
    res.sendFile(__dirname+'/offline/sw.js')
    // tslint:disable-next-line:no-console
    console.log(req.url);
  })

  server.get('*', (req, res) => handle(req, res))

  // Start server
  server.listen(config.port, err => {
    if (err) throw err;
    // tslint:disable-next-line:no-console
    console.log(`> Ready on http://localhost:${config.port}`);
  });
});
