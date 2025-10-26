import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('courses')
@UseGuards(AuthGuard('jwt'))
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }
}
