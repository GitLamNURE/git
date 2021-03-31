import { HttpModule, Module } from '@nestjs/common';

import { LoggerService } from '../logger.service';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
  ],
  controllers: [GithubController, ApiController],
  providers: [GithubService, ApiService, LoggerService],
})
export class ApiModule {}
