import { ILogger } from "./interface";

export class ConsoleLogger implements ILogger {
  error (object: any, entity?: Error): void {
    console.error(object, entity);
  }

  warning (object: any): void {
    console.warn(object);
  }

  info (object: any): void {
    console.log(object);
  }
}