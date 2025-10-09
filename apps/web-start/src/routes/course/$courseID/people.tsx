import { createFileRoute } from '@tanstack/react-router';
import UserCard from '../../../components/UserCard';

export const Route = createFileRoute('/course/$courseID/people')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen overflow-y-auto text-gray-900 mx-10">
      <div className="max-w-5xl py-5 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="w-full">
            <h2 className="text-3xl font-semibold tracking-tight">
              Introduction to Computer Science
            </h2>
            <p className="text-gray-500 text-sm mt-1">CSCI 101 • Fall 2025</p>
          </div>
        </div>
      </div>
      <div className="p-2 flex items-center">
        <h2 className="text-2xl font-semibold w-full">Course Members (100)</h2>
        <div className="mt-4 sm:mt-0 text-right w-full ml-auto flex items-center">
          <input
            type="text"
            placeholder="Search User"
            className="border border-slate-300 outline-none rounded-md p-1.5 w-full"
          />
          <button className="w-1/6 bg-slate-200 p-1.5 ml-2 border border-slate-500 rounded-md hover:cursor-pointer active:bg-slate-300">
            Filter
          </button>
          {/* Either by TA or students */}
        </div>
      </div>
      <div className="w-full my-5 grid grid-cols-3 gap-3">
        <UserCard />
      </div>
    </div>
  );
}
