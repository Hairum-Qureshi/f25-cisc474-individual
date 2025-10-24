import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CourseService } from './course.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/current-user-decorator';
import { JwtUser } from 'src/auth/jwt.strategy';

@Controller('courses')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: JwtUser) {
    console.log('User accessed:', user);
    return this.courseService.getAllCourses();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAllCourses() {
    return this.courseService.getAllCourses();
  }

  @Get(':id')
  async getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }
}
