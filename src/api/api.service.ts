import { BadRequestException, Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { GithubService } from './github/github.service';

@Injectable()
export class ApiService {
  constructor(
    private githubService: GithubService,
    private logger: LoggerService,
  ) {}

  getSignInLink(serviceName: string) {
    switch (serviceName.toLowerCase()) {
      case 'github':
        return this.githubService.getSignInLink();
      default:
        this.logger.warn('Invalid git service name', serviceName);
        throw new BadRequestException('Invalid git service name');
    }
  }
}
