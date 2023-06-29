import http from 'http';

import cors from 'cors';
import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';

import { sequelize } from './connector';
import { routes } from './routes';
import { errorHandler } from './middleware/errorHandler';
import { ResponseError } from './utils/interfaces';

const app = express();

app.use(express.json());

// Cors setup
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
    methods: 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Origin, Authorization, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin',
  }),
);

// DB connection
sequelize
  .sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(() => {
    console.error('Unable to connect to the database');
  });

// Attaches a value of startTimer which will be the indicator for how long it took for the request to be handled.
app.use((req, _res, next) => {
  console.log('----------------------');
  console.log(`New Request, Target: ${req.method} - ${req.baseUrl}`);
  next();
});

// Routes
app.use('/ping', (_req, res) => {
  res.send('Dogshouseservice.Version1.0.1');
});

app.use(routes);

// 404 handler
app.use((req, _res, next) => {
  const error: ResponseError = new Error(`${req.method} ${req.originalUrl} not found`)
  error.statusCode = 404;
  next(error)
});

app.use(errorHandler);

const APP_PORT = process.env.PORT || 4000;

const server = http.createServer(app);

function setupServer(): void {
  server.listen(APP_PORT);
}
// Server setup
setupServer();
