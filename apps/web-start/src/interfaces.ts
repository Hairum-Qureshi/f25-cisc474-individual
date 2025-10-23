import type { FileSystemType, FileType } from './enums';

interface FileSystemItemProps {
  fileSystemType: FileSystemType;
  fileType?: FileType;
  fileName: string;
  fileSizeBytes: number;
}

interface CourseProps {
  courseName: string;
  courseTimings: string;
  professorName: string;
  grade?: string;
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
}

interface NavbarProps {
  courseName?: string;
  courseID?: string;
  user: User | undefined;
}

interface UserCardProps {
  name: string;
  role: string;
  profilePicture: string;
}

export type {
  FileSystemItemProps,
  CourseProps,
  Course,
  NavbarProps,
  UserCardProps,
};
