import { ConnectionError, Sequelize } from 'sequelize';
import 'dotenv/config';

console.log(process.env.DB_PASSWORD);

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    dialectOptions: {
      options: {
        // Tedious options
        useUTC: false,
        dateFirst: 1,
      },
    },
    retry: {
      match: [/Deadlock/i, ConnectionError], // Retry on connection errors
      max: 5, // Maximum retry 5 times
      backoffBase: 3000, // Initial backoff duration in ms. Default: 100,
      backoffExponent: 1.5, // Exponent to increase backoff each try. Default: 1.1
      report: (_message, _obj, error) => error && console.log(`Connection error: ${error}. Retrying connection.`),
    },
  },
);
