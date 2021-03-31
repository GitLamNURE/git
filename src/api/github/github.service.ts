import { HttpService, Injectable } from '@nestjs/common';

import { config } from '../../config';
import { LoggerService } from '../../logger/logger.service';
import { UserTokens } from '../../models/user-tokens.entity';

@Injectable()
export class GithubService {
  constructor(
    private httpService: HttpService,
    private logger: LoggerService,
  ) {}

  getSignInLink() {
    return `https://github.com/login/oauth/authorize?client_id=${config.github.client_id}`;
  }

  async addUserTokens(user_id: string, code: string) {
    const res = (
      await this.httpService
        .post('https://github.com/login/oauth/access_token', {
          client_id: config.github.client_id,
          client_secret: config.github.client_secret,
          code,
        })
        .toPromise()
    ).data as string;

    if (res.indexOf('access_token=') === 0) {
      this.logger.warn('GitHub sign in error', {
        user_id,
        code,
      });
    }

    const access_token = res.slice(
      res.indexOf('access_token=') + 13,
      res.indexOf('&'),
    );

    if ((await UserTokens.find({ user_id })).length !== 0) {
      await UserTokens.findOneAndUpdate(
        { user_id },
        { github: { code, access_token } },
      );
      this.logger.log('User updated GitHub tokens', {
        user_id,
        github: { code, access_token },
      });
    } else {
      await UserTokens.create({
        user_id,
        github: { code, access_token },
      });
      this.logger.log('User created GitHub tokens', {
        user_id,
        github: { code, access_token },
      });
    }
  }
}
