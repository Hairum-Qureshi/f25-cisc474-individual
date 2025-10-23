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

interface Announcement {
  id: string;
  title: string;
  content: string;
  courseID: string;
  posterID: string;
  createdAt: string;
}

interface Course {
  id: string;
  courseName: string;
  professorId: string;
  announcements?: Array<Announcement>;
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

interface UserCardProps {
  name: string;
  role: string;
  profilePicture: string;
}

interface AnnouncementProps {
  title: string;
  poster: string;
  content: string;
  date: string;
}

export type {
  FileSystemItemProps,
  CourseProps,
  Course,
  UserCardProps,
  Announcement,
  AnnouncementProps,
};
