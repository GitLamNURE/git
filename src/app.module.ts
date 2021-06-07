import { HttpModule, Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { LoggerModule } from './logger/logger.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    ApiModule,
    AuthModule,
    LoggerModule,
    IntegrationsModule,
    UserTokensModule,
  ],
})
export class AppModule {}
