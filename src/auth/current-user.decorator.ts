import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { CurrentUserDto } from './dto/current-user.dto';

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) =>
    context.switchToHttp().getRequest().user as CurrentUserDto,
);
