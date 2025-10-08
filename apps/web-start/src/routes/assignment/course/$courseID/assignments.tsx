import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/assignment/course/$courseID/assignments',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/assignment/course/$courseID/assignments"!</div>
}
