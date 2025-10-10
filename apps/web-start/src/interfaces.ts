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

interface NavbarProps {
  courseName?: string;
  courseID?: string;
}

export type { FileSystemItemProps, CourseProps, Course, NavbarProps };
