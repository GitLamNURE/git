import { BadRequestException, Controller, Get, Query } from '@nestjs/common';

import { ApiService } from './api.service';

@Controller('git/api')
export class ApiController {
  constructor(private apiService: ApiService) {}

  @Get('get-signin-link')
  getSignInLink(@Query('service') serviceName: string) {
    if (!serviceName) {
      throw new BadRequestException('Git service name is empty');
    }

    return {
      link: this.apiService.getSignInLink(serviceName),
    };
  }
}
