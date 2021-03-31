import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { AuthModule } from './auth/auth.module';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    ApiModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
