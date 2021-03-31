import { All, Controller } from '@nestjs/common';

@Controller('git')
export class AppController {
  @All('ping')
  ping() {
    return 'Hello! ;)';
  }
}
