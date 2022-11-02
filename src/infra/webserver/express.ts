import 'express-async-errors';

import express, { Request, Response, NextFunction, Router } from 'express';
import httpStatus from 'http-status';
import { Routes } from '@/adapter/http/routes';
import { IServer } from './interface';
import { ILogger } from '../logger/interface';

export class ExpressWebServer implements IServer {
  readonly server = express();
  private logger: ILogger;
  private routes: Routes;

  async init(port: number, routes: Routes, logger: ILogger) {
    this.routes = routes;
    this.logger = logger;
    await this.routersSetup();
    this.listen(port, () => {
      this.logger.info(`Listening on port ${port}`);
    });
  }

  listen(port: number, callback: () => void): void {
    this.server.listen(port, callback);
  }

  private async routersSetup(): Promise<void> {
    this.server.use((req: Request, res: Response, next: NextFunction) => {
      const date = new Date();
      this.logger.info(`[${date.toISOString()}] ${req.method}:${req.url} ${res.statusCode}`);
      next();
    });

    const router = Router();
    this.routes.forEach(route => {
      router[route.method.toLowerCase()](route.path, (req: Request, res: Response) => route.handler(req, res));
    });
    this.server.use(router);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.server.use((error: Error, _req: Request, res: Response, _next: NextFunction) => {
      const status = httpStatus.INTERNAL_SERVER_ERROR;

      this.logger.error('Request/Response Error', error);
      res.status(status).json(error);
    });
  }
}
