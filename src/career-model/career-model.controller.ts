import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Result } from 'src/common/result.interface';
import { CareerModelService } from './career-model.service';
import { CreateCareerModelDto } from './dto/create-career-model.dto';
import { CreateSkillCardDto } from './dto/create-skill-card.dto';

@Controller('career-model')
export class CareerModelController {
  constructor(private readonly _careerModelService: CareerModelService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() data: CreateCareerModelDto,
  ): Promise<Result> {
    const { snsId, snsType } = req.user;

    if (data.type === 'PI') {
      if (data.secondaryTag === undefined) {
        throw new BadRequestException(
          'secondary 역량이 포함되어 있지 않습니다',
        );
      }
    }

    if (data.otherTag.length < 1 || data.otherTag.length > 3) {
      if (data.type === 'T' || data.type === 'PI') {
        throw new BadRequestException('1~3개의 기타역량을 포함해야합니다.');
      }
    }

    return await this._careerModelService.createCareerModel(
      snsId,
      snsType,
      data,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getCareerModel(@Req() req) {
    const { user } = req.user;

    return await this._careerModelService.getCareerModel(user);
  }

  @Get('skill')
  async getSkillInfo() {
    return this._careerModelService.getSkillInfo();
  }

  @UseGuards(JwtAuthGuard)
  @Post('skill-card')
  async createSkillCard(
    @Req() req,
    @Body() data: CreateSkillCardDto,
  ): Promise<Result> {
    const { user } = req.user;

    return await this._careerModelService.createSkillCard(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('skill-card')
  async getSkillCard(@Req() req) {
    const { user } = req.user;

    return await this._careerModelService.getSkillCard(user);
  }
}
