export class GetRepositoryBranchesDto {
  vcs: string;
  repository: {
    owner: string;
    name: string;
  };
}
