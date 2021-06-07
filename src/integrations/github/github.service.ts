import { BadRequestException, HttpService, Injectable } from '@nestjs/common';

import { config } from '../../config';
import { LoggerService } from '../../logger/logger.service';
import { UserTokensService } from '../../user-tokens/user-tokens.service';
import { ITokens } from './interfaces/tokens.interface';
import { IRepository } from '../../api/interfaces/repository.interface';

@Injectable()
export class GithubService {
  constructor(
    private loggerService: LoggerService,
    private httpService: HttpService,
    private userTokensService: UserTokensService,
  ) {}

  getVCSSignInLink() {
    // const redirectUrl = new URL(`/git/github/callback`, config.publicUrl);
    // const redirectUrl = new URL(`/git/vcs-signin-link`, config.publicUrl);
    // return `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&redirect_uri=${redirectUrl}`;
    return `https://github.com/login/oauth/authorize?client_id=${config.github.clientId}&scope=repo`;
  }

  async addUserTokens(userId: string, code: string) {
    const res = (
      await this.httpService
        .post(
          'https://github.com/login/oauth/access_token',
          {
            code,
            client_id: config.github.clientId,
            client_secret: config.github.clientSecret,
          },
          {
            headers: {
              accept: 'application/json',
            },
          },
        )
        .toPromise()
    ).data;

    console.log(res);

    if (!res.access_token) {
      this.loggerService.warn('GitHub sign in error', {
        userId,
        code,
      });
      throw new BadRequestException('Wrong code');
    }

    await this.userTokensService.addTokens(userId, 'github', {
      accessToken: res.access_token,
      code,
    });
  }

  async getUserRepositories(tokens: ITokens) {
    const res = await this.httpService
      .get('https://api.github.com/user/repos', {
        headers: {
          Authorization: `token ${tokens.accessToken}`,
          accept: 'application/vnd.github.v3+json',
        },
      })
      .toPromise();

    return res.data.map((repo) => ({
      owner: repo.owner.login,
      name: repo.name,
    })) as IRepository[];
  }

  async getRepositoryBranches(tokens: ITokens, owner: string, name: string) {
    const res = await this.httpService
      .get(`https://api.github.com/repos/${owner}/${name}/branches`, {
        headers: {
          Authorization: `token ${tokens.accessToken}`,
          accept: 'application/vnd.github.v3+json',
        },
      })
      .toPromise();

    return res.data.map((branch) => branch.name);
  }
}
