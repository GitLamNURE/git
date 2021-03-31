import { HttpModule, Module } from '@nestjs/common';

import { config } from '../config';
import { AuthService } from './auth.service';
import { LoggerService } from '../logger.service';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
      baseURL: config.authServiceURL,
    }),
  ],
  providers: [AuthService, LoggerService],
})
export class AuthModule {}
