import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Assignment from '../../../components/Assignment';
import Announcement from '../../../components/Announcement';

export const Route = createFileRoute('/course/$courseID/')({
  component: CourseOverviewPage,
});

function CourseOverviewPage() {
  const { courseID } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: [`course ${courseID}`],
    queryFn: ({ queryKey }) => {
      const keyString = queryKey[0];
      const courseId = keyString?.split(' ')[1];

      return fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${courseId}`,
      ).then((res) => res.json());
    },
  });

  return (
    <div className="bg-slate-300 h-screen">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold my-5 mx-5">
              {isLoading ? 'Loading name...' : data?.courseName}
            </h2>
            <div className="ml-auto"></div>
          </div>
          <div className="space-y-5 mx-3 h-3/4 my-2 overflow-y-scroll">
            {/* Your lorem ipsum and content here */}
          </div>
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
              </div>
            </div>
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
