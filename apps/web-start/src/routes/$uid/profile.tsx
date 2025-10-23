import { createFileRoute } from '@tanstack/react-router';
import { FaEdit, FaRegUserCircle } from 'react-icons/fa';
import { useQueryClient } from '@tanstack/react-query';
import Course from '../../components/Course';

export const Route = createFileRoute('/$uid/profile')({
  component: RouteComponent,
  loader: async (context) => {
    const userID = (context.params as { uid?: string }).uid ?? '';

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${userID}`,
    );

    if (!response.ok) {
      console.error(
        'User data fetch failed',
        response.status,
        await response.text(),
      );
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return { userData };
  },
});

function RouteComponent() {
  const { userData } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 flex justify-center py-10">
      <div className="w-full max-w-5xl grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 flex items-center gap-4 border border-gray-100">
            <img
              src={
                userData?.profilePicture ||
                'https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg'
              }
              alt="Profile picture"
              className="w-30 h-30 rounded-full object-cover"
            />
            <div>
              <h2 className="text-3xl font-semibold text-gray-800">
                {userData?.fullName}
              </h2>
              <p className="text-sm text-gray-500">ID: {userData?.id}</p>
            </div>
          </div>
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {userData?.fullName}'s Bio:
            </h3>
            <div className="space-y-4">
              <p className="text-slate-500">
                {userData.bio || 'No bio written'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="bg-white shadow-sm rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Account Settings
            </h3>
            <div className="space-y-3">
              <p className="flex items-center hover:cursor-pointer text-sky-600">
                <span className="mr-2 text-2xl">
                  <FaRegUserCircle />
                </span>
                Update Profile Picture
              </p>
              <p className="flex items-center hover:cursor-pointer text-sky-600">
                <span className="mr-2 text-2xl">
                  <FaEdit />
                </span>
                Update Biography
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white shadow-sm rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 pt-5 pl-5">
                Courses Taking:
              </h3>
              <div className="space-y-5 mx-3 my-4">
                {userData?.enrolledCourses.length ? (
                  userData.enrolledCourses?.map((course: any) => (
                    <Course
                      key={course.id}
                      courseName={course.courseName}
                      courseTimings={course.courseTimings || ''}
                      professorName={course.professorName || ''}
                    />
                  ))
                ) : (
                  <p className="mx-3">No courses enrolled</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
