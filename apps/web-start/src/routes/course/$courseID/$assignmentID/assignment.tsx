import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/course/$courseID/$assignmentID/assignment',
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/course/$courseID/$assignmentID/assignment"!</div>;
}
