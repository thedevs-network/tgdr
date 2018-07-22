import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import config from './config';

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

    // Serve static files inside static folder
    server.use(express.static('static'));

    // Routes
    server.get('*', (req: express.Request, res: express.Response) => handle(req, res));

    // Start server
    server.listen(config.port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${config.port}`); // tslint:disable-line:no-console
    });
  });
