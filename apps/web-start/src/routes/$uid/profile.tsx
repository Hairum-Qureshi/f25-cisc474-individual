import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$uid/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$uid/profile"!</div>
}
