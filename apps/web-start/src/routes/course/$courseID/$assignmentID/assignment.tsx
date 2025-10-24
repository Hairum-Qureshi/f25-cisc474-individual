import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/course/$courseID/$assignmentID/assignment',
)({
  loader: async (context) => {
    const assignmentID =
      (context.params as { assignmentID?: string }).assignmentID ?? '';

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/assignments/${assignmentID}/assignment`,
    );

    if (!response.ok) {
      console.error(
        'Assignment data fetch failed',
        response.status,
        await response.text(),
      );
      throw new Error('Failed to fetch assignment data');
    }

    const assignmentData = await response.json();
    return { assignmentData };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { assignmentData } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        <div className="flex-1 bg-white shadow-sm rounded-xl border border-gray-100 p-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {assignmentData?.title}
              </h1>
            </div>
            <div className="mt-4 sm:mt-0 text-right">
              <p className="text-sm text-gray-600">
                Due:{' '}
                <span className="font-medium text-gray-800">
                  {new Date(assignmentData?.dueDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-600">
                Points:{' '}
                <span className="font-medium text-gray-800">
                  {assignmentData?.totalPoints}
                </span>
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Assignment Overview
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {assignmentData?.description}
            </p>

            <div className="mt-4 bg-gray-50 border border-gray-100 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">
                Submission Guidelines:
              </h3>
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                <li>
                  Include your name and student ID at the top of your report.
                </li>
                <li>
                  Upload both your Jupyter Notebook and report as a single .zip
                  file.
                </li>
                <li>Ensure your code runs without errors before submission.</li>
                <li>Late submissions will incur a 10% penalty per day.</li>
              </ul>
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-gray-700 font-medium text-sm">
                Your Submission
              </span>

              <span className="text-xs text-blue-600 font-semibold bg-blue-100 px-2 py-1 rounded-full">
                Not Submitted
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              You haven't uploaded any files yet. Click below to submit your
              assignment.
            </p>
            <div className="flex items-center gap-3">
              <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition-colors hover:cursor-pointer">
                Upload Submission
              </button>
              <button className="bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-md hover:bg-gray-300 transition-colors hover:cursor-pointer">
                View Rubric
              </button>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 bg-yellow-50 border border-yellow-100 rounded-xl shadow-sm p-6 h-fit lg:sticky lg:top-10">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Submission Feedback
          </h3>
          <p className="text-base">No feedback available</p>
          <div className="mt-5 border-t border-yellow-200 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Additional Tips:
            </h4>
            <p className="text-sm">No feedback available</p>
          </div>
        </div>
      </div>
    </div>
  );
}
