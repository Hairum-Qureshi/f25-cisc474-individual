import { Module } from '@nestjs/common';
import { LinksModule } from './links/links.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { CourseModule } from './course/course.module';
import { CourseGradeModule } from './course_grade/course_grade.module';
import { AssignmentModule } from './assignment/assignment.module';
import { PrismaService } from './prisma.service';
import { SubmissionModule } from './submission/submission.module';
import { AnnouncementModule } from './announcement/announcement.module';
import { DeadlineModule } from './deadline/deadline.module';

@Module({
  imports: [
    LinksModule,
    UserModule,
    SubmissionModule,
    FileModule,
    CourseModule,
    CourseGradeModule,
    AssignmentModule,
    AnnouncementModule,
    DeadlineModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
