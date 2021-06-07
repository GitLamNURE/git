import { Body, Controller, HttpService, Post } from '@nestjs/common';

import { config } from '../config';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return (
      await this.httpService
        .post(new URL('/auth/login', config.authServiceURL).toString(), dto)
        .toPromise()
    ).data;
  }
}
