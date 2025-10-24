import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import { DeadlineCreateIn, DeadlineUpdateIn } from '@repo/api/deadlines';

@Controller('deadlines')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}

  @Get()
  async getAllDeadlines() {
    return this.deadlineService.getAll();
  }

  @Get(':id')
  async getDeadlineById(@Param('id') id: string) {
    return this.deadlineService.getById(id);
  }

  @Post()
  createDeadline(@Body() createCourseDto: DeadlineCreateIn) {
    return this.deadlineService.create(createCourseDto);
  }

  @Patch()
  async updateDeadline(
    @Param('id') id: string,
    @Body() updateDeadlineDto: DeadlineUpdateIn,
  ) {
    return this.deadlineService.update(id, updateDeadlineDto);
  }

  @Delete()
  async deleteDeadline(@Param('id') id: string) {
    return this.deadlineService.delete(id);
  }
}
