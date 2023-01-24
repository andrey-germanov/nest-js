import { IsString, Max, Min } from 'class-validator';

export class AuthDto {
  // @Max(20)
  // @Min(6)
  @IsString()
  login: string;

  // @Max(12)
  // @Min(6)
  @IsString()
  password: string;
}
