import { Link, createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import UserCard from '../../../components/UserCard';
import { useApiClient } from '../../../integrations/api';
import type {
  CourseExtended,
  CourseMember,
  UserData,
} from '../../../interfaces';

export const Route = createFileRoute('/course/$courseID/people')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseID } = Route.useParams();
  const { request } = useApiClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const {
    data: courseData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['course-people', courseID],
    queryFn: () => request<CourseExtended>(`/courses/${courseID}`),
    enabled: !!courseID,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            You must be logged in to view course members.
          </h2>
          <p className="text-sky-700 font-semibold">
            Click{' '}
            <Link to="/" className="underline">
              here
            </Link>{' '}
            to sign in
          </p>
        </div>
      </div>
    );
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <p className="text-lg">Loading course members…</p>
      </div>
    );
  }

  if (isError || !courseData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <p className="text-lg text-red-600">
          Failed to load course members. Please try again later.
        </p>
      </div>
    );
  }

  const professor = courseData.professor
    ? [{ ...courseData.professor, role: 'Professor' }]
    : [];
  const tas = (courseData.tas ?? []).map((ta: UserData) => ({
    ...ta,
    role: 'TA',
  }));
  const students = (courseData.students ?? []).map((student: UserData) => ({
    ...student,
    role: 'Student',
  }));

  const joinedCourseMembers: Array<CourseMember> = [
    ...professor,
    ...tas,
    ...students,
  ] as Array<CourseMember>;

  return (
    <div className="h-screen overflow-y-auto text-gray-900 mx-10">
      <div className="p-2 my-10 flex items-center">
        <h2 className="text-3xl font-semibold w-full">
          Course Members ({joinedCourseMembers.length})
        </h2>
        <div className="mt-4 sm:mt-0 text-right w-full ml-auto flex items-center">
          <input
            type="text"
            placeholder="Search User"
            className="border border-slate-300 outline-none rounded-md p-1.5 w-full"
          />
          <button className="w-1/6 bg-slate-200 p-1.5 ml-2 border border-slate-500 rounded-md hover:cursor-pointer active:bg-slate-300">
            Filter
          </button>
        </div>
      </div>

      {joinedCourseMembers.length === 0 ? (
        <div className="text-center mt-10 text-gray-600">
          No members have been added to this course yet.
        </div>
      ) : (
        <div className="w-full my-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {joinedCourseMembers.map((member) => (
            <Link
              to={'/$uid/profile'}
              params={{ uid: member.id }}
              key={member.id}
            >
              <UserCard
                name={member.fullName}
                role={member.role}
                profilePicture={member.profilePicture}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
