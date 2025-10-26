import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AssignmentService } from './assignment.service';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('assignments')
export class AssignmentController {
  constructor(private assignmentService: AssignmentService) {}

  @Get()
  async getAllAssignments() {
    return this.assignmentService.getAllAssignments();
  }

  @Get(':id')
  async getAssignmentByCourseId(@Param('id') id: string) {
    return this.assignmentService.getAssignmentByCourseId(id);
  }

  @Get(':id/assignment')
  async getAssignmentById(@Param('id') id: string) {
    return this.assignmentService.getAssignmentById(id);
  }
}
