import { HttpModule, Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiModule } from './api/api.module';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService, LoggerService],
})
export class AppModule {}
