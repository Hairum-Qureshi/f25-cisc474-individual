import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AssignmentService {
  constructor(private prisma: PrismaService) {}

  async getAllAssignments() {
    return this.prisma.assignment.findMany();
  }

  async getAssignmentById(id: string) {
    return this.prisma.assignment.findUnique({ where: { id } });
  }
}
