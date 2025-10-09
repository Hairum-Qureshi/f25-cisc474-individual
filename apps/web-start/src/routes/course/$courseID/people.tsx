import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseID/people')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$courseID/people"!</div>
}
