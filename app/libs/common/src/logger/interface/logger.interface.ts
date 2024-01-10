export enum LogLevel {
  Emergency = 'emergency',
  Fatal = 'fatal',
  Error = 'error',
  Warn = 'warn',
  Info = 'info',
  Debug = 'debug',
}

export interface ILogData {}

export interface ILogger {
  log(level: LogLevel, message: string | Error, data?: ILogData): void;
  debug(message: string, data?: ILogData): void;
  info(message: string, data?: ILogData): void;
  warn(message: string | Error, data?: ILogData): void;
  error(message: string | Error, data?: ILogData): void;
  fatal(message: string | Error, data?: ILogData): void;
  emergency(message: string | Error, data?: ILogData): void;
}
