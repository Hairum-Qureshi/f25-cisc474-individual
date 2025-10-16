import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Course from '../components/Course';
import Calendar from '../components/Calendar';
import type { Course as ICourse } from '../interfaces';

// Fetch function with proper error handling
const fetchCourses = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/courses`);
  if (!res.ok) throw new Error(`Failed to fetch courses: ${res.status}`);
  return res.json();
};

export const Route = createFileRoute('/dashboard')({
  loader: fetchCourses, // Loader uses the same fetch function
  component: RouteComponent,
});

function RouteComponent() {
  const [showGrades, setShowGrades] = useState(false);

  // Get initial data from loader
  const initialData = useLoaderData({
    from: '/dashboard',
  });

  // React Query with proper error handling and retries
  const {
    data: courseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['courses'],
    queryFn: fetchCourses,
    initialData,
    retry: 2, // retry failed requests
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowGrades(e.target.checked);
  };

  if (isLoading) return <div className="p-5">Loading courses...</div>;
  if (error)
    return (
      <div className="p-5 text-red-600">
        Error loading courses: {(error as Error).message}
      </div>
    );

  return (
    <div className="bg-slate-300 min-h-screen h-auto">
      <div className="flex-1 p-3 flex space-x-4">
        <div className="w-1/2 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-2xl font-semibold my-5 mx-5">My Courses</h2>
            <div className="ml-auto">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={showGrades}
                  onChange={handleChange}
                />
                <div
                  className="
      w-11 h-6 bg-gray-400 rounded-full
      relative transition
      after:content-[''] after:absolute after:top-[2px] after:left-[2px]
      after:w-5 after:h-5 after:bg-white after:rounded-full
      after:transition-all
      peer-checked:bg-blue-600 peer-checked:after:translate-x-full
    "
                ></div>
                <span className="ml-3 mr-5 text-base font-medium">
                  {showGrades ? 'Hide grades' : 'Show grades'}
                </span>
              </label>
            </div>
          </div>
          <div className="space-y-5 mx-3 my-4">
            {courseData?.map((course: ICourse) => {
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
                    grade={showGrades ? 'TBD' : ''}
                  />
                </Link>
              );
            })}
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
