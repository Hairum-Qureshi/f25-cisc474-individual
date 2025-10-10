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

export type { FileSystemItemProps, CourseProps };
