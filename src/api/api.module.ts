import { HttpModule, Module } from '@nestjs/common';

import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { IntegrationsModule } from 'src/integrations/integrations.module';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    IntegrationsModule,
  ],
  controllers: [ApiController],
  providers: [ApiService],
  exports: [ApiService],
})
export class ApiModule {}
