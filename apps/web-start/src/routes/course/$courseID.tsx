import { createFileRoute } from '@tanstack/react-router';
import Announcement from '../../components/Announcement';
import Assignment from '../../components/Assignment';

export const Route = createFileRoute('/course/$courseID')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-slate-300 h-screen">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold my-5 mx-5">Course 1</h2>
            <div className="ml-auto"></div>
          </div>
          <div className="space-y-5 mx-3 my-4">awrawraw</div>
        </div>
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex">
            <div className="w-full overflow-y-scroll">
              <h2 className="text-2xl font-semibold my-5 mx-5">
                Upcoming Deadlines
              </h2>
              <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
                <Assignment />
              </div>
            </div>
            {/* <div className="w-1/2">
              <Calendar />
            </div> */}
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold my-5 mx-5">
              Recent Announcements
            </h2>
            <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
              <Announcement />
              <Announcement />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
