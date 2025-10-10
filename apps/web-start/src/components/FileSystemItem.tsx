import {
  FaFileWord,
  FaFolder,
  FaRegFileAlt,
  FaRegFileCode,
  FaRegFileImage,
  FaRegFilePdf,
} from 'react-icons/fa';
import React from 'react';
import type { FileSystemItemProps } from '../interfaces';

export default function FileSystemItem({
  fileSystemType,
  fileType,
  fileName,
  fileSizeBytes,
}: FileSystemItemProps) {
  const fileRecord: Record<string, React.FC> = {
    PDF: FaRegFilePdf,
    TXT: FaRegFileAlt,
    CODE: FaRegFileCode,
    WORD: FaFileWord,
    IMAGE: FaRegFileImage,
  };

  return (
    <div className="w-full flex items-center bg-gray-50 p-1.5 rounded-sm">
      <div className="text-3xl">
        {fileSystemType === 'FOLDER' ? (
          <FaFolder />
        ) : fileType && fileRecord[fileType] ? (
          React.createElement(fileRecord[fileType])
        ) : null}
      </div>
      <div className="ml-3">
        <h4 className="font-semibold">{fileName}</h4>
        <p className="text-sm">Added 10/2/2025</p>
      </div>
      <div className="ml-auto">{fileSizeBytes} KB</div>
    </div>
  );
}
