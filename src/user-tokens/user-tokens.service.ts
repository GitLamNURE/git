import { Injectable } from '@nestjs/common';

import { UserTokens } from './user-tokens.entity';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class UserTokensService {
  constructor(private loggerService: LoggerService) {}

  async addTokens(userId: string, service: string, tokens: any) {
    if ((await UserTokens.find({ userId })).length !== 0) {
      await UserTokens.findOneAndUpdate({ userId }, { [service]: tokens });
      this.loggerService.log('User updated GitHub tokens', {
        userId,
        [service]: tokens,
      });
    } else {
      await UserTokens.create({
        userId,
        [service]: tokens,
      });
      this.loggerService.log('User created GitHub tokens', {
        userId,
        [service]: tokens,
      });
    }
  }
}
