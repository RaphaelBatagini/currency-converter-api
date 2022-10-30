const path = require('path');
const fs = require('fs');
const { SnakeNamingStrategy } = require('typeorm-naming-strategies');
const dotenv = require('dotenv');

console.log(process.env);

if (!process.env.NODE_ENV) {
  throw new Error('NODE_ENV must be defined');
}

const envFilePath = path.resolve(__dirname, `./.env.${process.env.NODE_ENV}`);
if (process.env.NODE_ENV !== 'production' && fs.existsSync(envFilePath)) {
  dotenv.config({ path: envFilePath });
} else {
  dotenv.config();
}

const rootDir =
  fs.existsSync(path.resolve(__dirname, 'dist')) && process.env.NODE_ENV === 'production' ? 'dist' : 'src';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  entities: [`${rootDir}/models/*.{ts,js}`],
  migrations: [`${rootDir}/migrations/*.{ts,js}`],
  migrationsTransactionMode: 'each',
};