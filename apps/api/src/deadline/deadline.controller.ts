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

@Controller('deadlines')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllDeadlines() {
    return this.deadlineService.getAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getDeadlineById(@Param('id') id: string) {
    return this.deadlineService.getById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  createDeadline(@Body() createCourseDto: DeadlineCreateIn) {
    return this.deadlineService.create(createCourseDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateDeadline(
    @Param('id') id: string,
    @Body() updateDeadlineDto: DeadlineUpdateIn,
  ) {
    return this.deadlineService.update(id, updateDeadlineDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteDeadline(@Param('id') id: string) {
    return this.deadlineService.delete(id);
  }
}
