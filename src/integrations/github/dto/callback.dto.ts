import { ApiProperty } from '@nestjs/swagger';

export class CallbackDto {
  @ApiProperty()
  code: string;
}
