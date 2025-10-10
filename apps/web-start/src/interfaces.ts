import type { FileSystemType, FileType } from './enums';

export interface FileSystemItemProps {
  fileSystemType: FileSystemType;
  fileType?: FileType;
  fileName: string;
  fileSizeBytes: number;
}
