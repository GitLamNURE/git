import { LoggerService as NestLoggerService } from '@nestjs/common';
import * as fs from 'fs';

export class LoggerService implements NestLoggerService {
  getFullMessage(message: string, context?: any) {
    if (context) {
      message += '\nContext: ' + JSON.stringify(context, null, 2);
    }
    message += '\n\n--------------------\n\n';
    return message;
  }

  log(message: string, context?: any) {
    const fullMessage = this.getFullMessage(message, context);
    console.log(fullMessage);
    fs.appendFileSync('./logs/info.log', fullMessage);
  }

  warn(message: string, context?: any) {
    const fullMessage = this.getFullMessage(message, context);
    console.warn(fullMessage);
    fs.appendFileSync('./logs/warn.log', fullMessage);
  }

  error(message: string, context?: any) {
    const fullMessage = this.getFullMessage(message, context);
    console.error(fullMessage);
    fs.appendFileSync('./logs/error.log', fullMessage);
  }
}
