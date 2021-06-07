import { HttpModule, Module } from '@nestjs/common';

import { AuthController } from './auth.controller';

@Module({
  imports: [
    HttpModule.register({
      validateStatus: () => true,
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
