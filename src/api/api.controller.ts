import {
  All,
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ApiService } from './api.service';
import { CurrentUser } from '../auth/current-user.decorator';
import { CurrentUserDto } from '../auth/dto/current-user.dto';
import { GetRepositoryBranchesDto } from './dto/get-repository-branches.dto';

@Controller()
export class ApiController {
  constructor(private apiService: ApiService) {}

  @All('ping')
  ping() {
    return 'Hello! ;)';
  }

  @Get('vcs-signin-link')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  getVCSSignInLink(@Query('vcs') vcs: string) {
    if (!vcs) {
      throw new BadRequestException('VCS name is empty');
    }

    return {
      link: this.apiService.getVCSSignInLink(vcs),
    };
  }

  @Post('repositories')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getRepositories(@CurrentUser() user: CurrentUserDto) {
    return this.apiService.getUserRepositories(user.id);
  }

  @Post('repository/branches')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async getRepositoryBranches(
    @CurrentUser() user: CurrentUserDto,
    @Body() dto: GetRepositoryBranchesDto,
  ) {
    return {
      branches: await this.apiService.getRepositoryBranches(user.id, dto),
    };
  }
}
