import { createFileRoute, Link } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return isAuthenticated ? (
    <div>
      User Information: {JSON.stringify(user, null, 2)}.
      <Link to="/dashboard">Head to your dashboard</Link>
    </div>
  ) : (
    <div>
      <LoginButton />
    </div>
  );
}
