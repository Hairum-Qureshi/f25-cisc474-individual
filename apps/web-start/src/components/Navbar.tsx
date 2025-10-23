import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';

export default function Navbar() {
  const [lightMode, setLightMode] = useState(true);

  const CURR_UID = 'cmh2ol4jb001ksb0rhr07fa3j';

  const { data: currUserData } = useQuery({
    queryKey: ['currUserData'],
    queryFn: () => {
      return fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`,
      ).then((res) => res.json());
    },
  });

  const routerState = useRouterState();
  const currentMatch = routerState.matches.at(-1);
  const params = currentMatch?.params as { courseID?: string } | undefined;
  const courseID = params?.courseID;

  const { data: courseData } = useQuery({
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
    <nav className="w-full bg-slate-200 p-4 h-20">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg border-2 border-slate-400">
          <img
            src={currUserData?.profilePicture}
            alt="User profile picture"
            className="w-full h-full rounded-md object-cover"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold ml-3 text-lg">
            {currUserData?.fullName}
          </h3>
          <h3 className="font-semibold ml-3 text-slate-600 text-sm">
            UID: {currUserData?.id}
          </h3>
        </div>
        <div className="ml-auto flex items-center space-x-5">
          <Link to="/dashboard" className="font-semibold text-sky-700">
            Dashboard
          </Link>
          <Link
            to="/$uid/profile"
            params={{ uid: CURR_UID }}
            className="font-semibold text-sky-700"
          >
            Profile
          </Link>
          {courseData?.courseName && courseID && (
            <Link
              to="/course/$courseID"
              params={{ courseID }}
              className="font-semibold text-sky-700"
            >
              {courseData?.courseName}
            </Link>
          )}
          {courseID && (
            <>
              <Link
                to="/course/$courseID/syllabus"
                params={{ courseID }}
                className="font-semibold text-sky-700"
              >
                Syllabus
              </Link>
              <Link
                to="/course/$courseID/media"
                params={{ courseID }}
                className="font-semibold text-sky-700"
              >
                Media & Files
              </Link>
              <Link
                to="/course/$courseID/assignments"
                params={{ courseID }}
                className="font-semibold text-sky-700"
              >
                Assignments
              </Link>
              <Link
                to="/course/$courseID/grades"
                params={{ courseID }}
                className="font-semibold text-sky-700"
              >
                Grades
              </Link>
              <Link
                to="/course/$courseID/people"
                params={{ courseID }}
                className="font-semibold text-sky-700"
              >
                People
              </Link>
            </>
          )}
          <div
            className="mx-4 bg-slate-700 text-yellow-300 w-10 h-10 flex items-center justify-center rounded-full hover:cursor-pointer"
            onClick={() => setLightMode(!lightMode)}
          >
            {lightMode ? <IoSunny className="text-2xl" /> : <FaMoon />}
          </div>
        </div>
      </div>
    </nav>
  );
}
