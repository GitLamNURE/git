import { ApiProperty } from '@nestjs/swagger';

export class GetRepositoryBranchesDto {
  @ApiProperty()
  vcs: string;

  @ApiProperty()
  repository: {
    owner: string;
    name: string;
  };
}
