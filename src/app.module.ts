import { HttpModule, Module } from '@nestjs/common';

import { ApiModule } from './api/api.module';
import { LoggerModule } from './logger/logger.module';
import { UserTokensModule } from './user-tokens/user-tokens.module';
import { IntegrationsModule } from './integrations/integrations.module';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    ApiModule,
    LoggerModule,
    IntegrationsModule,
    UserTokensModule,
  ],
})
export class AppModule {}
