import { createFileRoute } from '@tanstack/react-router';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoFilter } from 'react-icons/io5';
import VideoLecture from '../../../components/VideoLecture';
import FileSystemItem from '../../../components/FileSystemItem';
import { FileSystemType, FileType } from '../../../enums';

export const Route = createFileRoute('/course/$courseID/media')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen overflow-y-scroll">
      <div className="flex-1 p-3 flex mx-10 space-x-4">
        <div className="max-w-2/5 flex-5 rounded-md bg-slate-200">
          <div className="flex flex-col">
            <h2 className="text-2xl font-semibold mt-5 mx-5">
              Recorded Lectures
            </h2>
            <div className="flex items-center w-full mt-5 mb-3">
              <input
                type="text"
                placeholder="Search by title"
                className="border border-slate-400 bg-slate-50 rounded-tl-sm rounded-bl-sm p-1.5 outline-none flex-grow ml-5 rounded-none"
              />
              <div className="w-10 h-9.5 flex items-center hover:cursor-pointer active:bg-slate-500 rounded-tr-sm rounded-br-sm justify-center bg-slate-400 text-white mr-5 rounded-none">
                <FaMagnifyingGlass />
              </div>
            </div>
          </div>
          <div className="space-y-5 m-3 h-screen overflow-y-scroll">
            <VideoLecture />
            <VideoLecture />
            <VideoLecture />
          </div>
        </div>
        <div className="w-3/5 rounded-md bg-slate-200">
          <div>
            <div className="w-full">
              <h2 className="text-2xl font-semibold my-5 mx-5">
                Course Files & Documents
              </h2>
              <div className="flex items-center w-full mt-5 mb-3">
                <input
                  type="text"
                  placeholder="Search by title"
                  className="border border-slate-400 bg-slate-50 rounded-tl-sm rounded-bl-sm p-1.5 outline-none flex-grow ml-5 rounded-none"
                />
                <div className="w-10 h-9.5 flex items-center hover:cursor-pointer active:bg-slate-500 rounded-tr-sm rounded-br-sm justify-center bg-slate-400 text-white mr-5 rounded-none">
                  <FaMagnifyingGlass />
                </div>
                <div
                  className="w-10 h-9.5 flex items-center hover:cursor-pointer active:bg-slate-500 rounded-sm  justify-center bg-slate-400 text-white mr-4"
                  title="Filter by file type"
                >
                  <IoFilter />
                </div>
              </div>
              <div className="space-y-5 mx-3 my-4 h-screen overflow-y-auto">
                <FileSystemItem
                  fileSystemType={FileSystemType.FILE}
                  fileType={FileType.PDF}
                  fileName={'Course Notes.pdf'}
                  fileSizeBytes={245}
                />
                <FileSystemItem
                  fileSystemType={FileSystemType.FILE}
                  fileType={FileType.WORD}
                  fileName={'Course Syllabus'}
                  fileSizeBytes={525}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
