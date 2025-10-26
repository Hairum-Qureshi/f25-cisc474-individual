/// <reference types="vite/client" />
import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import { TanStackDevtools } from '@tanstack/react-devtools';
import TanStackQueryDevtools from '../integrations/devtools';
import appCss from '../styles.css?url';
import Navbar from '../components/Navbar';
import type { QueryClient } from '@tanstack/react-query';
import { useAuth0 } from '@auth0/auth0-react';

export interface MyRouterContext {
  queryClient: QueryClient;
}

const CURR_UID = 'cmh3v8sgj0000y0gscplhgko8';

export const Route = createRootRouteWithContext<MyRouterContext>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'TanStack Start Starter' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  loader: async (context) => {
    const courseID = (context.params as { courseID?: string }).courseID ?? '';

    const [courseRes, userRes] = await Promise.all([
      fetch(`${import.meta.env.VITE_BACKEND_URL}/courses/${courseID}`),
      fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${CURR_UID}`),
    ]);

    const [courseData, userData] = await Promise.all([
      courseRes.json(),
      userRes.json(),
    ]);

    return { courseData, userData };
  },
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth0();
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="flex flex-col">
        {isAuthenticated && <Navbar />}
        {children}
        <TanStackDevtools
          config={{ position: 'bottom-right' }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
            TanStackQueryDevtools,
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
