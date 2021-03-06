import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateCareerYearDto } from './dto/create-career-year.dto';
import { CreateJobGroupDto } from './dto/create-job-group.dto';
import { UpdateCareerYearDto } from './dto/update-career-year.dto';
import { UpdateJobGroupDto } from './dto/update-job-group.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('job-group')
  async createJobGroup(@Req() req, @Body() data: CreateJobGroupDto) {
    const { snsId, snsType } = await req.user;
    return await this._userService.createJobGroup(snsId, snsType, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('job-group')
  async modifyJobGroup(@Body() data: UpdateJobGroupDto) {
    return await this._userService.modifyJobGroup(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('career-year')
  async addCareerYear(@Req() req, @Body() data: CreateCareerYearDto) {
    const { snsId, snsType } = req.user;
    return await this._userService.addCareerYear(snsId, snsType, data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('career-year')
  async modifyCareerYear(@Req() req, @Body() data: UpdateCareerYearDto) {
    const { user } = req.user;

    return await this._userService.modifyCareerYear(user, data);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUserInfo(@Req() req) {
    const { user } = req.user;

    return await this._userService.getAllUserInfo(user);
  }
}
