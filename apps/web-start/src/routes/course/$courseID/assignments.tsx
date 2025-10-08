import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseID/assignments')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$courseID/assignments"!</div>
}
