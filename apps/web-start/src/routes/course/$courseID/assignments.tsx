import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import Module from '../../../components/Module';

export const Route = createFileRoute('/course/$courseID/assignments')({
  component: RouteComponent,
  loader: async (context) => {
    const courseID = (context.params as { courseID?: string }).courseID ?? '';

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/assignments/${courseID}`,
    );

    if (!response.ok) {
      console.error(
        'Assignment fetch failed',
        response.status,
        await response.text(),
      );
      throw new Error('Failed to fetch assignment data');
    }

    const assignmentsData = await response.json();
    return { assignmentsData };
  },
});

function RouteComponent() {
  const [collapseAll, setCollapseAll] = useState(false);
  const { assignmentsData } = Route.useLoaderData();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCollapseAll(e.target.checked);
  };

  const groupedByModule = assignmentsData.reduce(
    (acc: any, assignment: any) => {
      const key = assignment.module;
      if (!acc[key]) acc[key] = [];
      acc[key].push(assignment);
      return acc;
    },
    {},
  );

  return (
    <div className="h-screen overflow-y-scroll">
      <div className="flex-1 p-3 flex mx-10 space-x-4">
        <div className="w-3/4 flex-5 rounded-md bg-slate-200">
          <div className="flex items-center">
            <h2 className="text-3xl font-semibold my-5 mx-5">Assignments</h2>
            <div className="ml-auto">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={collapseAll}
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
                  {collapseAll ? 'Close All' : 'Open All'}
                </span>
              </label>
            </div>
          </div>
          <div className="space-y-5 mx-3 h-screen overflow-y-scroll">
            {Object.entries(groupedByModule).map(
              ([moduleName, assignments], index) => (
                <Module
                  key={index}
                  collapseAll={collapseAll}
                  module={moduleName} // the key, e.g. "Module C"
                  moduleMetaData={assignments as any} // the array of assignments
                />
              ),
            )}
          </div>
        </div>
        <div className="w-1/4 rounded-md bg-slate-200">
          <div className="flex">
            <div className="w-full overflow-y-scroll">
              <h2 className="text-2xl font-semibold my-5 mx-5">
                Recent Feedback
              </h2>
              <div className="space-y-5 mx-3 my-4 h-60 overflow-y-auto">
                You currently have no recent feedback
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
