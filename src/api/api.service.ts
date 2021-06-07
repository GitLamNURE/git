import { BadRequestException, Injectable } from '@nestjs/common';

import { LoggerService } from '../logger/logger.service';
import { GithubService } from '../integrations/github/github.service';
import { UserTokens } from '../user-tokens/user-tokens.entity';
import { IUserRepositories } from './interfaces/user-repositories.interface';
import { GetRepositoryBranchesDto } from './dto/get-repository-branches.dto';

@Injectable()
export class ApiService {
  constructor(
    private logger: LoggerService,
    private githubService: GithubService,
  ) {}

  getVCSSignInLink(vcs: string) {
    switch (vcs.toLowerCase()) {
      case 'github':
        return this.githubService.getVCSSignInLink();
      default:
        this.logger.warn('Invalid VCS name', vcs);
        throw new BadRequestException('Invalid VCS name');
    }
  }

  async getUserRepositories(userId: string) {
    const userTokens = await UserTokens.findOne({ userId });
    if (!userTokens) {
      return [];
    }

    const userRepositories: IUserRepositories = {};
    if (userTokens.github) {
      userRepositories.github = await this.githubService.getUserRepositories(
        userTokens.github,
      );
    }

    return userRepositories;
  }

  async getRepositoryBranches(userId: string, dto: GetRepositoryBranchesDto) {
    const userTokens = await UserTokens.findOne({ userId });
    if (!userTokens) {
      return [];
    }

    switch (dto.vcs) {
      case 'github':
        if (!userTokens.github) {
          return [];
        }

        return await this.githubService.getRepositoryBranches(
          userTokens.github,
          dto.repository.owner,
          dto.repository.name,
        );
      default:
        return [];
    }
  }
}
