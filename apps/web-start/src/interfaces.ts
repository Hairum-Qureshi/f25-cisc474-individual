import type { FileSystemType, FileType } from './enums';

interface FileSystemItemProps {
  fileSystemType: FileSystemType;
  fileType?: FileType;
  fileName: string;
  fileSizeBytes: number;
  createdAt: string;
}

interface CourseProps {
  courseName: string;
  courseTimings: string;
  professorName: string;
}

interface Course {
  id: string;
  courseName: string;
  professorId: string;
  createdAt: string;
  updatedAt: string;
}

enum Role {
  PROFESSOR = 'PROFESSOR',
  TA = 'TA',
  STUDENT = 'STUDENT',
  ADMIN = 'ADMIN',
}

interface EnrolledCourses {
  id: string;
  courseName: string;
  description: string;
  professorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  password: string;
  fullName: string;
  profilePicture: string;
  bio: string | null;
  role: Role;
  createdAt: string;
  updatedAt: string;
  isAdmin: boolean;
  enrolledCourses?: Array<EnrolledCourses>;
}

/*

{
"id": "cmh2olurh01cssb0r4aeu3vc2",
"courseName": "Universal fresh-thinking strategy",
"description": "Amicitia cultellus magnam deporto vorago quo tremo teneo velum sustineo. Bibo eos omnis aranea audeo. Vehemens atque varius.",
"professorId": "cmh2oisaw0006sbxmrjg6knsg",
"createdAt": "2025-10-23T00:26:12.604Z",
"updatedAt": "2025-10-23T00:26:12.604Z"
}

*/

interface UserCardProps {
  name: string;
  role: string;
  profilePicture: string;
}

export type { FileSystemItemProps, CourseProps, Course, UserCardProps };
