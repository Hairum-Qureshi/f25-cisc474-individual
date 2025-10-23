import { Controller, Get, Param } from '@nestjs/common';
import { AssignmentService } from './assignment.service';

@Controller('assignments')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Get()
  async getAllAssignments() {
    return this.assignmentService.getAllAssignments();
  }

  @Get(':id')
  async getAssignmentById(@Param('id') id: string) {
    return this.assignmentService.getAssignmentByCourseId(id);
  }
}
