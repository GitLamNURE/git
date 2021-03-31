import { Controller, Get, Query } from '@nestjs/common';

import { GithubService } from './github.service';

@Controller('git/github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  @Get('callback')
  async userSignInCallback(@Query('code') code: string) {
    await this.githubService.addUserTokens('lol', code);
    return {
      success: true,
    };
  }
}
