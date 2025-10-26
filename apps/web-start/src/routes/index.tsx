import { createFileRoute } from '@tanstack/react-router';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <LoginButton />
    </div>
  );
}
