import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/course/$courseID/grades')({
  component: RouteComponent,
});

// TODO - add a search bar

function RouteComponent() {
  return (
    <div className="h-screen overflow-y-auto text-gray-900">
      <div className="max-w-5xl mx-auto py-5 px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              Introduction to Computer Science
            </h2>
            <p className="text-gray-500 text-sm mt-1">CSCI 101 • Fall 2025</p>
          </div>
          <div className="mt-4 sm:mt-0 text-right">
            <h1 className="text-6xl font-bold text-green-600">94%</h1>
            <p className="text-gray-500 text-sm">Current Grade</p>
          </div>
        </div>
      </div>
      <div className="mx-20 rounded-md border border-slate-300">
        <table className="w-full text-left text-gray-700 h-screen">
          <thead className="bg-gray-100 text-gray-500 text-sm uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 font-medium">#</th>
              <th className="px-6 py-4 font-medium">Assignment</th>
              <th className="px-6 py-4 font-medium">Module</th>
              <th className="px-6 py-4 font-medium text-right">Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              {
                id: 1,
                title: 'Homework 1: Python Basics',
                module: 'Module 1: Programming',
                score: '95/100',
              },
              {
                id: 2,
                title: 'Quiz 1: Data Types',
                module: 'Module 2: Core Concepts',
                score: '88/100',
              },
              {
                id: 3,
                title: 'Project Proposal',
                module: 'Module 3: Project Work',
                score: '90/100',
              },
              {
                id: 4,
                title: 'Homework 2: Pandas',
                module: 'Module 4: Data Manipulation',
                score: '92/100',
              },
              {
                id: 5,
                title: 'Midterm Exam',
                module: 'Modules 1-4',
                score: '85/100',
              },
              {
                id: 6,
                title: 'Final Project',
                module: 'Module 5: Capstone',
                score: '—/100',
                dueSoon: true,
              },
            ].map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50 transition-colors text-base hover:cursor-pointer"
              >
                <td className="px-6 py-4 text-gray-500">{item.id}</td>
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-blue-600">
                      {item.title}
                    </div>
                    <div className="text-gray-400 text-sm">{item.module}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500">{item.module}</td>
                <td className="px-6 py-4 text-right">
                  {item.dueSoon ? (
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md">
                      Due Soon
                    </span>
                  ) : (
                    <span className="font-semibold">{item.score}</span>
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
