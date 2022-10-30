import { server, Server } from '@/infra/webserver';
import { logger } from './infra/logger';

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
    await server.init();
    server.listen(+process.env.PORT, () => {
      logger.info(`Listening on port ${process.env.PORT}`);
    });
    handleExit(server);
  } catch (err) {
    logger.error('Server exited with error', err);
    process.exit(ExitCodes.Failure);
  }
}

function handleExit(server: Server) {
  const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];

  exitSignals.forEach((sig) => {
    process.on(sig, async () => {
      try {
        await server.close();
        logger.info('Server exited successfully');
        process.exit(ExitCodes.Success);
      } catch (err) {
        logger.error('Server exited with error', err);
        process.exit(ExitCodes.Failure);
      }
    });
  });
}

initServer();
