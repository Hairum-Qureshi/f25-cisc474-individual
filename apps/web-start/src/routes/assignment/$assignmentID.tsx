import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/assignment/$assignmentID')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/assignment/$assignmentID"!</div>
}
