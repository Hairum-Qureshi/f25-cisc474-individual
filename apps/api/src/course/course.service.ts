import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async getAllCourses() {
    return this.prisma.course.findMany();
  }

  async getCourseById(id: string) {
    // used ChatGPT to understand how to use Prisma to populate the ID references to get more data
    return this.prisma.course.findUnique({
      where: { id },
      include: {
        professor: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        tas: {
          select: {
            id: true,
            fullName: true,
          },
        },
        students: {
          select: {
            id: true,
            fullName: true,
          },
        },
        assignments: {
          select: {
            id: true,
            title: true,
            dueDate: true,
            module: true,
          },
        },
      },
    });
  }
}
