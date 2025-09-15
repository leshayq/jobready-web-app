import { LoggerService, LogLevel } from '@nestjs/common';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';

export class CustomLogger implements LoggerService {
  private readonly logsBaseDir = join(process.cwd(), 'logs');

  log(message: any, context: string): void {
    this.writeToFile('log', message, context);
  }

  warn(message: any, context: string): void {
    this.writeToFile('warn', message, context);
  }

  error(message: any, trace?: string, context?: string): void {
    this.writeToFile('error', message, context, trace);
  }

  private getLogDir(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const logDir = join(this.logsBaseDir, String(year), month, day);
    return logDir;
  }

  private async writeToFile(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ): Promise<void> {
    const time = new Date();
    const logDir = this.getLogDir();
    await fs.mkdir(logDir, { recursive: true });

    const logFile = join(logDir, 'app.log');

    const log = `[${time.toISOString()}] [${level}] ${context ? context : ''} ${message}${trace ? trace : ''}\n`;

    await fs.appendFile(logFile, log, 'utf8');
  }
}
