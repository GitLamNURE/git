import { HttpModule, Module } from '@nestjs/common';

import { GithubController } from './github/github.controller';
import { GithubService } from './github/github.service';
import { UserTokensModule } from '../user-tokens/user-tokens.module';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
    UserTokensModule,
  ],
  controllers: [GithubController],
  providers: [GithubService],
  exports: [GithubService],
})
export class IntegrationsModule {}
