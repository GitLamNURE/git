import { HttpService, Injectable, UnauthorizedException } from '@nestjs/common';

import { LoggerService } from '../logger.service';

@Injectable()
export class AuthService {
  constructor(
    private httpService: HttpService,
    private logger: LoggerService,
  ) {}

  private successStatuses = [200, 201];
  async verifySign(token: string) {
    const res = await this.httpService
      .post('/auth/verify', {
        token: token,
      })
      .toPromise();

    if (!this.successStatuses.includes(res.status)) {
      throw new UnauthorizedException('Invalid signature');
    }

    const userId = res.data.user_id as string;
    if (!userId) {
      this.logger.error('No user_id in auth service response', res);
      return;
    }

    return userId;
  }
}
