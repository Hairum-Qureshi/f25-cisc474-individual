import { Controller } from '@nestjs/common';
import { DeadlineService } from './deadline.service';

@Controller('deadline')
export class DeadlineController {
  constructor(private readonly deadlineService: DeadlineService) {}
}
