import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async getAllAssignments() {
    return this.prisma.assignment.findMany();
  }

  async getAssignmentByCourseId(id: string) {
    return this.prisma.assignment.findMany({ where: { courseID: id } });
  }

  async getAssignmentById(id: string) {
    return this.prisma.assignment.findUnique({ where: { id } });
  }
}
