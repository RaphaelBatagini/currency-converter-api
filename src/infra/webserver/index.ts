import 'express-async-errors';

import express, { Express, Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import path from 'path';
import * as dotenv from 'dotenv';
const fs = require('fs');

import { connect, close } from '@/infra/database/config';
import { logger } from '../logger';

export class Server {
  readonly server = express();

  async init(): Promise<Express> {
    this.loadEnvironmentVariables();
    await this.databaseSetup();
    await this.routersSetup();

    return this.server;
  }

  async close(): Promise<void> {
    await close();
  }

  listen(port: number, callback: () => void): void {
    this.server.listen(port, callback);
  }

  private async databaseSetup(): Promise<void> {
    await connect();
  }

  private async routersSetup(): Promise<void> {
    this.server.use((request: Request, response: Response, next: NextFunction) => {
      const date = new Date();
      logger.info(`[${date.toISOString()}] ${request.method}:${request.url} ${response.statusCode}`);
      next();
    });

    this.server.use('/health', (_req, res) => {
      res.sendStatus(httpStatus.OK);
    });

    this.server.use('/api/convert/:currency/:amount', (_req, res) => {
      res.sendStatus(httpStatus.OK);
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.server.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = httpStatus.INTERNAL_SERVER_ERROR;

      logger.error('Request/Response Error', error);
      res.status(status).json(error);
    });
  }

  private loadEnvironmentVariables(): void {
    if (!process.env.NODE_ENV) {
      throw new Error('NODE_ENV must be defined');
    }

    const envFilePath = path.resolve(__dirname, `./../../../.env.${process.env.NODE_ENV}`);
    if (process.env.NODE_ENV !== 'production' && fs.existsSync(envFilePath)) {
      dotenv.config({ path: envFilePath });
    } else {
      dotenv.config();
    }
  }
}

export const server = new Server();
