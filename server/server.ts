import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as passport from 'passport';
import config from './config';
import authApi from './api/authApi';
import entryApi from './api/entryApi';
import * as errorController from './controllers/errorController';

// Import Telegram bot
import './bot';

// Import passport strategies
import './passport';

const app = next({ dev: config.is_dev });
const handle = app.getRequestHandler();
mongoose.connect(config.db_uri);

app.prepare()
  .then(() => {
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
    server.use('/api/auth', authApi);
    server.use('/api/entry', entryApi);
    server.use(errorController.send);

    server.get('*', (req, res) => handle(req, res));

    // Start server
    server.listen(config.port, err => {
      if (err) throw err;
      console.log( // tslint:disable-line:no-console
        `> Ready on http://localhost:${config.port}`
      ); 
    });
  });
