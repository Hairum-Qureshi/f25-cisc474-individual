import { Link, createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import UserCard from '../../../components/UserCard';
import type { CourseMember, UserData } from '../../../interfaces';

export const Route = createFileRoute('/course/$courseID/people')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseID } = Route.useParams();

  const { data: courseData, isLoading } = useQuery({
    queryKey: [`course ${courseID}`],
    queryFn: () => {
      return fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${courseID}`,
      ).then((res) => res.json());
    },
  });

  const joinedCourseMembers = [
    { ...courseData?.professor, role: 'Professor' },
    ...(courseData?.tas.map((ta: UserData) => ({ ...ta, role: 'TA' })) || []),
    ...(courseData?.students.map((student: UserData) => ({
      ...student,
      role: 'Student',
    })) || []),
  ];

  return (
    <div className="h-screen overflow-y-auto text-gray-900 mx-10">
      <div className="p-2 my-10 flex items-center">
        <h2 className="text-3xl font-semibold w-full">
          Course Members (
          {isLoading
            ? joinedCourseMembers.length - 1
            : joinedCourseMembers.length || 0}
          )
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
          {/* Either by TA or students */}
        </div>
      </div>
      <div className="w-full my-5 grid grid-cols-3 gap-3">
        {isLoading
          ? 'Loading...'
          : joinedCourseMembers.map((member: CourseMember) => (
              <Link
                to={'/$uid/profile'}
                params={{ uid: member.id }}
                key={member.id}
              >
                <UserCard
                  key={member.id}
                  name={member.fullName}
                  role={member.role}
                  profilePicture={member.profilePicture}
                />
              </Link>
            ))}
        {/* <UserCard />
        <UserCard />
        <UserCard />
        <UserCard /> */}
      </div>
    </div>
  );
}
