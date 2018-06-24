import * as express from 'express';
import * as next from 'next';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server: express.Application = express();

    // Use helmet to secure app with HTTP headers
    server.use(helmet());

    // Use morgan to log requests for dev
    if (dev) {
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
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`); // tslint:disable-line:no-console
    });
  });
