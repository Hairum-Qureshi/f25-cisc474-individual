import { useQuery } from '@tanstack/react-query';
import { Link, createFileRoute } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import { useApiClient } from '../../../integrations/api';
import type { Course, CourseExtended } from '../../../interfaces';

export const Route = createFileRoute('/course/$courseID/syllabus')({
  component: RouteComponent,
});

function RouteComponent() {
  const { courseID } = Route.useParams();
  const { request } = useApiClient();
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  const { data: courseData, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => request<Course>(`/courses/${courseID}`),
    enabled: !!courseID,
  });

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-300">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            You must be logged in to view course syllabus.
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
        <p className="text-lg">Loading course syllabus</p>
      </div>
    );
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-50 rounded-md text-gray-800 antialiased">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <header className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">
                {isLoading ? 'Loading...' : courseData?.courseName} Syllabus
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Instructor: {(courseData as CourseExtended)?.professor.fullName}{' '}
                · Spring 2026 · Tue/Thu 10:30-11:50 AM · Room 204
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-md bg-white border border-gray-200 px-3 py-2 text-sm">
                <span className="font-medium">Mode:</span> In-person
              </div>
            </div>
          </header>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-4">
              <div className="sticky top-6 rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700">Contact</h2>
                <dl className="mt-3 text-sm text-gray-600 space-y-2">
                  <div>
                    <dt className="font-medium">Email</dt>
                    <dd>{(courseData as CourseExtended)?.professor.email}</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Office</dt>
                    <dd>Engineering Bldg, Rm 512</dd>
                  </div>
                  <div>
                    <dt className="font-medium">Office Hours</dt>
                    <dd>Wed 2:00-4:00pm or by appointment</dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700">
                  Grading Breakdown
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600">
                  <li className="flex justify-between">
                    <span>Project (final)</span>
                    <span className="font-medium">40%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Midterm</span>
                    <span className="font-medium">20%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Homework & Labs</span>
                    <span className="font-medium">25%</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Participation</span>
                    <span className="font-medium">15%</span>
                  </li>
                </ul>
              </div>
              <div className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                <h3 className="text-sm font-semibold text-gray-700">
                  Resources
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li className="text-gray-600">Course repo (GitHub)</li>
                  <li className="text-gray-600">
                    Lecture slides (Media & Files page)
                  </li>
                  <li className="text-gray-600">
                    Recommended: *Designing Web APIs*
                  </li>
                </ul>
              </div>
            </aside>
            <main className="lg:col-span-3 space-y-6">
              <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <article className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Course Goals
                  </h4>
                  <p className="mt-2 text-sm text-gray-600">
                    Build robust, scalable full-stack web applications with
                    modern tooling. Emphasis on TypeScript, testing, deployment,
                    and security fundamentals.
                  </p>
                </article>
                <article className="rounded-lg bg-white border border-gray-200 p-4 shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700">
                    Prerequisites
                  </h4>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>- Data Structures (CS 220)</li>
                    <li>- Web Programming (CS 330) or equivalent experience</li>
                  </ul>
                </article>
              </section>
              <section className="rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Important Dates
                  </h2>
                  <span className="text-sm text-gray-500">
                    Updated: Jan 10, 2026
                  </span>
                </div>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-sm text-left">
                    <thead>
                      <tr>
                        <th className="py-2 pr-4 font-medium text-gray-600">
                          Date
                        </th>
                        <th className="py-2 pr-4 font-medium text-gray-600">
                          Item
                        </th>
                        <th className="py-2 font-medium text-gray-600">
                          Notes
                        </th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-700">
                      <tr className="border-t border-gray-100">
                        <td className="py-3 pr-4">Feb 12</td>
                        <td className="py-3 pr-4">Midterm Exam</td>
                        <td className="py-3">In-class, closed notes</td>
                      </tr>
                      <tr className="border-t border-gray-100 bg-gray-50">
                        <td className="py-3 pr-4">Apr 22</td>
                        <td className="py-3 pr-4">Project Presentations</td>
                        <td className="py-3">Final deliverables due</td>
                      </tr>
                      <tr className="border-t border-gray-100">
                        <td className="py-3 pr-4">May 6</td>
                        <td className="py-3 pr-4">Final Exam</td>
                        <td className="py-3">Comprehensive</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  Weekly Topics & Readings
                </h2>
                <ol className="mt-4 space-y-4 text-sm text-gray-700">
                  <li className="flex gap-4">
                    <div className="w-10 flex-shrink-0">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-medium">
                        1
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Intro & Tooling
                      </h3>
                      <p className="text-gray-600 mt-1">
                        TypeScript setup, monorepos, linting, and CI basics.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Reading: Ch. 1-2 (course notes)
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 flex-shrink-0">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-medium">
                        5
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        API Design & Testing
                      </h3>
                      <p className="text-gray-600 mt-1">
                        REST vs GraphQL, contract testing, integration tests.
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Reading: API design notes
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-10 flex-shrink-0">
                      <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-medium">
                        9
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">
                        Deployment & Observability
                      </h3>
                      <p className="text-gray-600 mt-1">
                        CI/CD pipelines, containerization, logging, monitoring.
                      </p>
                    </div>
                  </li>
                </ol>
              </section>
              {/* <section className="rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  Sample Assignments
                </h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-md border border-gray-100 p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800">
                      Lab 1 — TSX Component Library
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      Build a small UI kit in TypeScript + React, include docs
                      and tests.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 rounded bg-white border border-gray-200">
                        Due: Jan 28
                      </span>
                      <span className="px-2 py-1 rounded bg-white border border-gray-200">
                        Points: 5
                      </span>
                    </div>
                  </div>
                  <div className="rounded-md border border-gray-100 p-4 bg-gray-50">
                    <h4 className="font-medium text-gray-800">
                      Project Milestone 1
                    </h4>
                    <p className="mt-1 text-sm text-gray-600">
                      API design and initial backend prototype with tests.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span className="px-2 py-1 rounded bg-white border border-gray-200">
                        Due: Mar 10
                      </span>
                      <span className="px-2 py-1 rounded bg-white border border-gray-200">
                        Points: 10
                      </span>
                    </div>
                  </div>
                </div>
              </section> */}
              <section className="rounded-lg bg-white border border-gray-200 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800">
                  Policies
                </h2>
                <ul className="mt-4 space-y-3 text-sm text-gray-700">
                  <li>
                    <strong>Late work:</strong> Acceptable up to 48 hours with
                    10% penalty per day unless prior arrangement.
                  </li>
                  <li>
                    <strong>Academic integrity:</strong> Collaboration
                    encouraged on design; code must be your own. Violations
                    reported to the honor council.
                  </li>
                  <li>
                    <strong>Accessibility:</strong> Contact instructor or
                    disability services for accommodations as early as possible.
                  </li>
                </ul>
              </section>
              <footer className="text-xs text-gray-500">
                <p>
                  This syllabus is a sample and subject to change. Official
                  dates and deadlines will be posted on the course site; always
                  refer to the course site for the authoritative schedule.
                </p>
              </footer>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dummy syllabus placeholder generated by ChatGPT
