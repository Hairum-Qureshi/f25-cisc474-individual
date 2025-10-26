import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-800 via-sky-900 to-slate-950">
      <div className="bg-slate-100 shadow-2xl rounded-2xl p-10 w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-slate-800">
          Welcome to <span className="text-sky-600">My LMS!</span>
        </h1>
        <p className="text-slate-600">
          Sign in to continue to your dashboard and access your courses.
        </p>
        <div className="flex items-center">
          {!isAuthenticated ? (
            <LoginButton />
          ) : (
              <button className="bg-sky-500 p-2 w-full text-white rounded-md hover:bg-sky-600 transition-colors hover:cursor-pointer" onClick = {() => navigate({ to: "/dashboard" })}>
                Continue to Dashboard
              </button>
          )}
        </div>
        <p className="text-xs text-slate-500 mt-6">
          By continuing, you agree to our{' '}
          <Link
            to="#"
            className="text-sky-600 hover:text-sky-700 underline transition-colors"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            to="#"
            className="text-sky-600 hover:text-sky-700 underline transition-colors"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
