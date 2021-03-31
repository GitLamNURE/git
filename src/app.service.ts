import { Injectable } from '@nestjs/common';

import { LoggerService } from './logger.service';

@Injectable()
export class AppService {
  constructor(private logger: LoggerService) {}
}
