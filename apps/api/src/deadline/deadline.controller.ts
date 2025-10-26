import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import { DeadlineCreateIn, DeadlineUpdateIn } from '@repo/api/deadlines';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@UseGuards(AuthGuard('jwt'))
@Controller('deadlines')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}

  @Get()
  async getAllDeadlines(@CurrentUser() auth: JwtUser) {
    return this.deadlineService.getAll(auth.userId);
  }

  @Get(':id')
  async getDeadlineById(@Param('id') id: string) {
    return this.deadlineService.getById(id);
  }

  @Post()
  createDeadline(@Body() createCourseDto: DeadlineCreateIn) {
    return this.deadlineService.create(createCourseDto);
  }

  @Patch(':id')
  async updateDeadline(
    @Param('id') id: string,
    @Body() updateDeadlineDto: DeadlineUpdateIn,
  ) {
    return this.deadlineService.update(id, updateDeadlineDto);
  }

  @Delete(':id')
  async deleteDeadline(@Param('id') id: string) {
    return this.deadlineService.delete(id);
  }
}
