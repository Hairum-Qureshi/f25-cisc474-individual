import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
            scope: 'read:courses',
            prompt: 'consent',
          },
        })
      }
      className="bg-green-500 p-2 w-full text-white rounded-md hover:bg-green-600 transition-colors hover:cursor-pointer"
    >
      Log In
    </button>
  );
};

export default LoginButton;
