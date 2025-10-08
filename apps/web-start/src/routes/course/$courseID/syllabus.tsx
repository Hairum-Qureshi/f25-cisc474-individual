import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseID/syllabus')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$courseID/syllabus"!</div>
}
