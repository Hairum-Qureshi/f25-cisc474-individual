import { Link, createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiClient } from '../../../integrations/api';
import type { Assignment, CourseGrade } from '../../../interfaces';

export const Route = createFileRoute('/course/$courseID/grades')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseID } = Route.useParams();
  const { request } = useApiClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const { data: courseGradeRes, isLoading: courseGradeLoading } = useQuery({
    queryKey: ['courseGrade', courseID],
    queryFn: () => request<CourseGrade>(`/course-grades/${courseID}`),
    enabled: !!courseID,
  });

  const { data: assignmentRes = [], isLoading: assignmentsLoading } = useQuery({
    queryKey: ['assignments', courseID],
    queryFn: () => request<Assignment[]>(`/assignments/${courseID}`),
    enabled: !!courseID,
  });

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            You must be logged in to view your grades.
          </h2>
          <p className="text-sky-700 font-semibold">
            Click here{' '}
            <Link to="/" className="underline">
              here
            </Link>{' '}
            to sign in
          </p>
        </div>
      </div>
    );
  }

  if (courseGradeLoading || assignmentsLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700">
        <p>Loading course data…</p>
      </div>
    );
  }
  return (
    <div className="h-screen overflow-y-auto text-gray-900 bg-slate-100">
      <div className="mx-20 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-slate-800">
            Grades Overview
          </h2>
          <div className="text-right">
            <h1
              className={`text-6xl font-bold ${
                courseGradeRes ? 'text-green-600' : 'text-gray-400'
              }`}
            >
              {courseGradeRes?.numericGrade != null
                ? `${courseGradeRes.numericGrade}%`
                : 'N/A'}
            </h1>
            <p className="text-gray-500 text-sm">
              {courseGradeRes ? 'Current Grade' : 'Grade not available'}
            </p>
          </div>
        </div>
      </div>

      <div className="mx-20 rounded-md border border-slate-300 bg-white overflow-auto shadow-sm">
        <table className="w-full text-left text-gray-700 align-top">
          <thead className="bg-slate-200 text-gray-600 text-sm uppercase tracking-wide sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3.5 font-medium">#</th>
              <th className="px-4 py-3.5 font-medium">Assignment</th>
              <th className="px-4 py-3.5 font-medium">Module</th>
              <th className="px-4 py-3.5 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 align-top">
            {assignmentRes.length ? (
              assignmentRes.map((assignment, index) => (
                <tr
                  key={assignment.id}
                  className="hover:bg-gray-50 transition-colors text-base"
                >
                  <td className="px-4 py-3 text-gray-500">{index + 1}</td>

                  <td className="px-4 py-3">
                    <Link
                      to="/course/$courseID/$assignmentID/assignment"
                      params={{ courseID, assignmentID: assignment.id }}
                      className="font-medium text-blue-600 hover:underline"
                    >
                      {assignment.title}
                    </Link>
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {assignment.module || 'N/A'}
                  </td>

                  <td className="px-4 py-3 text-right">
                    <span className="font-semibold text-slate-800">
                      {Math.floor(Math.random() * assignment.totalPoints)}/
                      {assignment.totalPoints}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 text-sm italic"
                >
                  No assignments found for this course.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
