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
import { FaRegFileZipper } from 'react-icons/fa6';

export default function FileSystemItem({
  fileSystemType,
  fileType,
  fileName,
  fileSizeBytes,
  createdAt,
}: FileSystemItemProps) {
  const fileRecord: Record<string, React.FC> = {
    PDF: FaRegFilePdf,
    TXT: FaRegFileAlt,
    CODE: FaRegFileCode,
    WORD: FaFileWord,
    DOC: FaFileWord,
    DOCX: FaFileWord,
    IMAGE: FaRegFileImage,
    JPG: FaRegFileImage,
    PNG: FaRegFileImage,
    ZIP: FaRegFileZipper,
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
        <p className="text-sm">
          Added{' '}
          {new Date(createdAt).toLocaleDateString('en-US', {
            timeZone: 'America/New_York',
          })}
        </p>
      </div>
      <div className="ml-auto">{fileSizeBytes} KB</div>
    </div>
  );
}
