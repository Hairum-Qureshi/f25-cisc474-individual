import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FileService {
  constructor(private prisma: PrismaService) {}

  async getAllFiles() {
    return this.prisma.file.findMany();
  }

  async getFileById(id: string) {
    return this.prisma.file.findFirst({ where: { courseID: id } });
  }
}
