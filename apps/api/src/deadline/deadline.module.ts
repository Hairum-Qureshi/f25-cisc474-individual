import { Module } from '@nestjs/common';
import { DeadlineController } from './deadline.controller';
import { DeadlineService } from './deadline.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DeadlineController],
  providers: [DeadlineService, PrismaService],
})
export class DeadlineModule {}
