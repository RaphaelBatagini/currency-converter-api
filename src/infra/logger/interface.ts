export interface ILogger {
  error: (object: any, entity?: Error) => void;
  warning: (object: any) => void;
  info: (object: any) => void;
};