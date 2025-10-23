import { Link, createFileRoute, useLoaderData } from '@tanstack/react-router';

export const Route = createFileRoute('/course/$courseID/grades')({
  component: RouteComponent,
  loader: async ({ params }) => {
    const courseID = (params as { courseID?: string }).courseID ?? '';

    const [courseGradeRes, assignmentRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/course-grades/${courseID}`), // ! this doesn't get the course grade for the current user, only for the current course
      fetch(`${import.meta.env.VITE_BACKEND_URL}/assignments/${courseID}`),
    ]);

    let courseGradeData: any = null;

    if (courseGradeRes.ok) {
      try {
        courseGradeData = await courseGradeRes.json();
      } catch {
        courseGradeData = null;
      }
    } else {
      courseGradeData = null;
    }

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

  return (
    <div className="h-screen overflow-y-auto text-gray-900">
      <div className="mx-20 py-5">
        <div className="flex">
          <div className="sm:mt-0 ml-auto text-right">
            <h1
              className={`text-6xl font-bold ${
                courseGradeData ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {courseGradeData?.numericGrade != null
                ? `${courseGradeData.numericGrade}%`
                : 'N/A'}
            </h1>
            <p className="text-gray-500 text-sm">
              {courseGradeData ? 'Current Grade' : 'Grade not available'}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-20 rounded-md border border-slate-300 h-screen overflow-auto">
        <table className="w-full text-left text-gray-700 align-top">
          <thead className="bg-slate-200 text-gray-500 text-sm uppercase tracking-wide sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3.5 font-medium">#</th>
              <th className="px-4 py-3.5 font-medium">Assignment</th>
              <th className="px-4 py-3.5 font-medium">Module</th>
              <th className="px-4 py-3.5 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 align-top">
            {assignmentsData?.map((assignment: any, index: number) => (
              <tr
                key={assignment.id}
                className="hover:bg-gray-50 bg-slate-100 transition-colors text-base align-top"
              >
                <td className="px-4 py-3 text-gray-500 align-top">
                  {index + 1}
                </td>

                <td className="px-4 py-3 align-top">
                  <Link
                    to="/course/$courseID/$assignmentID/assignment"
                    params={{ courseID, assignmentID: assignment.id }}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {assignment.title}
                  </Link>
                </td>

                <td className="px-4 py-3 text-gray-500 align-top">
                  {assignment.module}
                </td>

                <td className="px-4 py-3 text-right align-top">
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
