import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMissionDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  done?: boolean;
}
