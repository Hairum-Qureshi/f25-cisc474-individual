import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/course/$courseID/media')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/course/$courseID/media"!</div>
}
