import { Module } from '@nestjs/common';
import { DeadlineService } from './deadline.service';
import { DeadlineController } from './deadline.controller';

@Module({
  controllers: [DeadlineController],
  providers: [DeadlineService],
})
export class DeadlineModule {}
