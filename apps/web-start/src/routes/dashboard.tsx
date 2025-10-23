import { Link, createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import Course from '../components/Course';
import Calendar from '../components/Calendar';
import type { Course as ICourse } from '../interfaces';

const CURR_UID = 'cmh3v8sgj0000y0gscplhgko8';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: currUserData, isLoading } = useQuery({
    queryKey: ['currUserData'],
    queryFn: () => {
      return fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`,
      ).then((res) => res.json());
    },
  });

  return (
    <div className="bg-slate-300 min-h-screen h-auto">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold mt-5 mx-5">My Courses</h2>
          </div>
          <div className="space-y-5 mx-3 my-3">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              currUserData?.enrolledCourses?.map((course: ICourse) => {
                return (
                  <Link
                    key={course.id}
                    to="/course/$courseID"
                    params={{ courseID: course.id }}
                    className="m-3"
                  >
                    <Course
                      courseName={course.courseName}
                      courseTimings={'Course Timings TBD'}
                      professorName={'Professor Name TBD'}
                    />
                  </Link>
                );
              })
            )}
          </div>
        </div>
        <div className="w-1/2 rounded-md bg-slate-200">
          <div className="flex">
            <div className="w-1/2 overflow-y-scroll">
              <h2 className="text-2xl font-semibold my-5 mx-5">
                Upcoming Deadlines
              </h2>
              <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
                <p className="mx-3">
                  There are currently no assignments with upcoming deadlines 🎉
                </p>
              </div>
            </div>
            <div className="w-1/2">
              <Calendar />
            </div>
          </div>
          <div className="w-full">
            <h2 className="text-2xl font-semibold my-5 mx-5">
              Recent Announcements
            </h2>
            <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
              <p className="mx-3">
                There are currently no recent announcements
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
