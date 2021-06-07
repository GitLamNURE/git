import { Controller, Post, Body, UseGuards, Query, Get } from '@nestjs/common';

import { GithubService } from './github.service';
import { AuthGuard } from '../../auth/auth.guard';
import { CurrentUser } from '../../auth/current-user.decorator';
import { CurrentUserDto } from '../../auth/dto/current-user.dto';
import { CallbackDto } from './dto/callback.dto';

@Controller('git/github')
export class GithubController {
  constructor(private githubService: GithubService) {}

  // @Post('callback')
  @Get('callback')
  // @UseGuards(AuthGuard)
  async userSignInCallback(
    // @CurrentUser() user: CurrentUserDto,
    // @Body() dto: CallbackDto,
    @Query('code') code: string,
  ) {
    // await this.githubService.addUserTokens(user.id, dto.code);
    await this.githubService.addUserTokens('604923b0e370758c9449b659', code);

    return {
      success: true,
    };
  }
}
