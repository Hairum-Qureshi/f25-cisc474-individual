import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DeadlineCreateIn, DeadlineUpdateIn } from '@repo/api/deadlines';

@Injectable()
export class DeadlineService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    const deadlines = await this.prisma.deadline.findMany({
      orderBy: { courseDeadline: 'asc' },
    });
    return deadlines;
  }

  async getById(id: string) {
    return this.prisma.deadline.findUnique({ where: { id } });
  }

  async create(data: DeadlineCreateIn) {
    return this.prisma.deadline.create({
      data: {
        courseTitle: data.courseTitle,
        courseDescription: data.courseDescription,
        courseDeadline: new Date(data.courseDeadline),
        ownerId: data.ownerId,
      },
    });
  }

  async update(id: string, data: DeadlineUpdateIn) {
    return this.prisma.deadline.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.deadline.delete({ where: { id } });
  }
}
