import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FileService } from './file.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('files')
@UseGuards(AuthGuard('jwt'))
export class FileController {
  constructor(private fileService: FileService) {}

  @Get()
  async getAllFiles() {
    return this.fileService.getAllFiles();
  }

  @Get(':id')
  async getFileById(@Param('id') id: string) {
    return this.fileService.getFileById(id);
  }
}
