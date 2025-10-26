import { Link, useRouterState } from '@tanstack/react-router';
import { useState } from 'react';
import { IoSunny } from 'react-icons/io5';
import { FaMoon } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiClient, useCurrentUser } from '../integrations/api';
import { Course } from '../interfaces';

export default function Navbar() {
  const [lightMode, setLightMode] = useState(true);
  const { data: currUserData } = useCurrentUser();
  const CURR_UID = currUserData?.id;

  const routerState = useRouterState();
  const currentMatch = routerState.matches.at(-1);
  const params = currentMatch?.params as { courseID?: string } | undefined;
  const courseID = params?.courseID;

  const { request } = useApiClient();
  const { logout } = useAuth0();

  const { data: courseData } = useQuery({
    queryKey: ['course', courseID],
    queryFn: () => request(`/courses/${courseID}`),
    enabled: !!courseID, // prevent running before ID exists
  });

  return (
    <nav className="w-full bg-slate-200 p-4 h-20">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg border-2 border-slate-400">
          <img
            src={currUserData?.profilePicture || ''}
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
          <p
            className="font-semibold text-sky-700 hover:cursor-pointer"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </p>
          <Link to="/dashboard" className="font-semibold text-sky-700">
            Dashboard
          </Link>
          <Link
            to="/$uid/profile"
            params={{ uid: CURR_UID! }}
            className="font-semibold text-sky-700"
          >
            Profile
          </Link>
          {(courseData as Course)?.courseName && courseID && (
            <Link
              to="/course/$courseID"
              params={{ courseID }}
              className="font-semibold text-sky-700"
            >
              {(courseData as Course)?.courseName}
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
