import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/course/$courseID')({
  component: CourseLayout,
});

function CourseLayout() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Outlet />
    </div>
  );
}
