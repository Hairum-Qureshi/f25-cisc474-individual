import { createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import type { User } from '../../../interfaces';

const CURR_UID = 'cmh2ol4jb001ksb0rhr07fa3j';

export const Route = createFileRoute('/course/$courseID/grades')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const queryClient = context.queryClient;
    const currUser: User = queryClient.getQueryData(['currUserData']) as User;

    console.log('>', currUser);

    const [courseGradeRes, assignmentRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/course-grades/${CURR_UID}`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments`),
    ]);

    const courseGradeData = await courseGradeRes.json();
    const assignmentsData = await assignmentRes.json();

    return { courseGradeData, assignmentsData };
  },
});

// TODO - add a search bar

function RouteComponent() {
  const { courseID } = Route.useParams();
  const { courseGradeData, assignmentsData } = useLoaderData({
    from: '/course/$courseID/grades',
  });

  console.log(assignmentsData);

  return (
    <div className="h-screen overflow-y-auto text-gray-900">
      <div className="mx-20 py-5">
        <div className="flex">
          <div className="sm:mt-0 ml-auto">
            <h1 className="text-6xl font-bold text-green-600">
              {courseGradeData.numericGrade}%
            </h1>
            <p className="text-gray-500 text-sm">Current Grade</p>
          </div>
        </div>
      </div>
      <div className="mx-20 rounded-md border border-slate-300">
        <table className="w-full text-left text-gray-700 h-screen">
          <thead className="bg-slate-200 text-gray-500 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 font-medium">#</th>
              <th className="px-6 py-4 font-medium">Assignment</th>
              <th className="px-6 py-4 font-medium">Module</th>
              <th className="px-6 py-4 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {assignmentsData?.map((assignment: any, index: number) => (
              <tr
                key={assignment.id}
                className="hover:bg-gray-50 bg-slate-100 transition-colors text-base"
              >
                <td className="px-6 py-4 text-gray-500">{index + 1}</td>

                <td className="px-6 py-4">
                  <Link
                    to="/course/$courseID/$assignmentID/assignment"
                    params={{ courseID, assignmentID: assignment.id }}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {assignment.title}
                  </Link>
                </td>

                <td className="px-6 py-4 text-gray-500">{assignment.module}</td>

                <td className="px-6 py-4 text-right">
                  {assignment.dueSoon ? (
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                      Due Soon
                    </span>
                  ) : (
                    <span className="font-semibold">
                      {Math.floor(Math.random() * assignment.totalPoints)}/
                      {assignment.totalPoints}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
