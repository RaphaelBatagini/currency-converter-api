import { logger } from './infra/logger';
import { getWebServer } from './infra/webserver';
import { connect, close } from '@/infra/database/config';
import path from 'path';
import * as dotenv from 'dotenv';
import fs from 'fs';
import { routes } from './adapter/http/routes';

enum ExitCodes {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Server exiting due to an unhandled promise rejection: ${promise} and reason ${reason}`);
  throw reason;
});

process.on('uncaughtException', (error) => {
  logger.error('Server exiting due to uncaught exception', error);
  process.exit(ExitCodes.Failure);
});

async function initServer(): Promise<void> {
  try {
    loadEnvironmentVariables();
    await databaseSetup();
    const webserver = getWebServer();
    webserver.init(+process.env.PORT, routes, logger);
    handleExit();
  } catch (err) {
    logger.error('Server exited with error', err);
    process.exit(ExitCodes.Failure);
  }
}

async function databaseSetup(): Promise<void> {
  if (process.env.REPOSITORY_TYPE !== 'memory') {
    await connect();
  }
}

function handleExit() {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach((sig) => {
    process.on(sig, async () => {
      try {
        await closeConnection();
        logger.info('Server exited successfully');
        process.exit(ExitCodes.Success);
      } catch (err) {
        logger.error('Server exited with error', err);
        process.exit(ExitCodes.Failure);
      }
    });
  });
}

async function closeConnection(): Promise<void> {
  await close();
}

function loadEnvironmentVariables(): void {
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

initServer();
