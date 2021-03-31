import {
  CanActivate,
  ExecutionContext,
  HttpService,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { config } from '../config';
import { LoggerService } from '../logger/logger.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private httpService: HttpService,
    private logger: LoggerService,
  ) {}

  private successStatuses = [200, 201];
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const headers = request.headers;
    if (
      !headers.authorization ||
      !headers.authorization.toLowerCase().startsWith('bearer')
    ) {
      throw new UnauthorizedException('No JWT token present in headers');
    }

    const token = headers.authorization.slice(7);
    const verifyUrl = new URL('/auth/verify', config.authServiceURL).toString();
    const res = await this.httpService.post(verifyUrl, { token }).toPromise();

    if (!this.successStatuses.includes(res.status)) {
      throw new UnauthorizedException('Invalid JWT token');
    }

    const userId = res.data.user_id as string;
    if (!userId) {
      this.logger.error('No user_id in auth service response', res);
      return;
    }

    request.user = { id: userId };

    return true;
  }
}
