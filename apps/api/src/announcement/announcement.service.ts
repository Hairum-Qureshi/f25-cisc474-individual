import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private prisma: PrismaService) {}

  async getAllAnnouncements() {
    return this.prisma.announcement.findMany();
  }

  async getAnnouncementById(id: string) {
    return this.prisma.announcement.findMany({ where: { id } });
  }
}
