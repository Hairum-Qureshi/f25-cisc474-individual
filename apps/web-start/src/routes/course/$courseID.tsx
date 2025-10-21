import { useQuery } from '@tanstack/react-query';
import { Outlet, createFileRoute, useLoaderData } from '@tanstack/react-router';
import type { Course } from '../../interfaces';

export const Route = createFileRoute('/course/$courseID')({
  loader: async ({ params }): Promise<Course> => {
    const courseID = params.courseID ?? '';

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/courses/${courseID}`,
    );
    if (!res.ok) throw new Error('Failed to fetch course');

    return res.json();
  },
  component: CourseLayout,
});

function CourseLayout() {
  const initialData = useLoaderData({ from: Route.id });

  const { data: courseData } = useQuery({
    queryKey: ['courseData', initialData.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/courses/${initialData.id}`,
      );
      if (!res.ok) throw new Error('Failed to refetch course');
      return res.json();
    },
    initialData,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
