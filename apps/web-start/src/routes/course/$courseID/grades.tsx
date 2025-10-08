import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseID/grades')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$courseID/grades"!</div>
}
