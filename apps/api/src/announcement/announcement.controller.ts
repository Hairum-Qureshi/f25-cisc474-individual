import { Controller, Get, Param } from '@nestjs/common';
import { AnnouncementService } from './announcement.service';

@Controller('announcements')
export class AnnouncementController {
  constructor(private readonly announcementService: AnnouncementService) {}

  @Get()
  async getAllFiles() {
    return this.announcementService.getAllAnnouncements();
  }

  @Get(':id')
  async getFileById(@Param('id') id: string) {
    return this.announcementService.getAnnouncementById(id);
  }
}
