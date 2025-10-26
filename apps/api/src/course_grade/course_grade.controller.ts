import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseGradeService } from './course_grade.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('course-grades')
@UseGuards(AuthGuard('jwt'))
export class CourseGradeController {
  constructor(private courseGradeService: CourseGradeService) {}

  @Get()
  async getAllCourseGrades() {
    return this.courseGradeService.getAllCourseGrades();
  }

  @Get(':id')
  async getCourseGradeById(@Param('id') id: string) {
    return this.courseGradeService.getCourseGradeById(id);
  }
}
