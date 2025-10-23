import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseGradeService {
  constructor(private prisma: PrismaService) {}

  async getAllCourseGrades() {
    return this.prisma.courseGrade.findMany();
  }

  async getCourseGradeById(id: string) {
    return this.prisma.courseGrade.findFirst({ where: { studentID: id } });
  }
}
